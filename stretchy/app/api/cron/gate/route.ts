import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const FEE = 23; // $20 + 15% GST

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const gate = new Date(now.getTime() + 36 * 60 * 60 * 1000);

  // Sessions where the 36h gate has arrived (starts_at is within next 36h)
  const { data: sessions } = await supabase
    .from('sessions')
    .select('id, title, host_target, min_attendees, max_attendees, starts_at')
    .eq('state', 'open')
    .lte('starts_at', gate.toISOString())
    .gt('starts_at', now.toISOString());

  if (!sessions?.length) {
    return NextResponse.json({ processed: 0, confirmed: 0, cancelled: 0 });
  }

  let confirmed = 0;
  let cancelled = 0;

  for (const session of sessions) {
    const { count: holdCount } = await supabase
      .from('holds')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', session.id)
      .eq('state', 'active');

    const count = holdCount ?? 0;

    if (count >= session.min_attendees) {
      // Confirm session
      await supabase.from('sessions').update({ state: 'confirmed' }).eq('id', session.id);

      const finalPrice = Math.round((session.host_target + FEE) / count);
      const amountCents = Math.round(finalPrice * 100);

      // Get active holds with attendee stripe customer ids
      const { data: holds } = await supabase
        .from('holds')
        .select('id, user_id')
        .eq('session_id', session.id)
        .eq('state', 'active');

      for (const hold of holds ?? []) {
        const { data: attendee } = await supabase
          .from('attendees')
          .select('stripe_customer_id, stripe_pm_id')
          .eq('auth_user_id', hold.user_id)
          .single();

        if (attendee?.stripe_customer_id && attendee?.stripe_pm_id) {
          try {
            const pi = await stripe.paymentIntents.create({
              amount: amountCents,
              currency: 'nzd',
              customer: attendee.stripe_customer_id,
              payment_method: attendee.stripe_pm_id,
              confirm: true,
              off_session: true,
              metadata: { hold_id: hold.id, session_id: session.id },
            });
            await supabase.from('holds')
              .update({ state: 'charged', stripe_pi_id: pi.id, amount_charged_nzd: amountCents })
              .eq('id', hold.id);
          } catch {
            await supabase.from('holds').update({ state: 'payment_failed' }).eq('id', hold.id);
          }
        } else {
          // No payment method on file — confirm hold, charge manually later
          await supabase.from('holds').update({ state: 'confirmed' }).eq('id', hold.id);
        }

        // Insert going_ahead notification for this hold's user
        await supabase.from('notifications').insert({
          user_id: hold.user_id,
          type: 'going_ahead',
          session_id: session.id,
          data: { title: session.title, price: finalPrice },
        });
      }

      confirmed++;
    } else {
      // Cancel — floor not met, release all holds

      // 1. Get active hold user_ids before releasing
      const { data: activeHolds } = await supabase
        .from('holds')
        .select('id, user_id')
        .eq('session_id', session.id)
        .eq('state', 'active');

      // 2. Release all holds and cancel session
      await supabase.from('sessions').update({ state: 'cancelled' }).eq('id', session.id);
      await supabase.from('holds').update({ state: 'released' })
        .eq('session_id', session.id)
        .eq('state', 'active');

      // 3. Insert cancelled notifications for each released hold
      for (const h of activeHolds ?? []) {
        await supabase.from('notifications').insert({
          user_id: h.user_id,
          type: 'cancelled',
          session_id: session.id,
          data: { title: session.title },
        });
      }

      cancelled++;
    }
  }

  return NextResponse.json({
    processed: sessions.length,
    confirmed,
    cancelled,
    timestamp: now.toISOString(),
  });
}
