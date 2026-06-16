import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object as Stripe.PaymentIntent;
      const holdId = pi.metadata?.hold_id;
      if (holdId) {
        await supabase
          .from('holds')
          .update({ state: 'charged', stripe_pi_id: pi.id, amount_charged_nzd: pi.amount })
          .eq('id', holdId);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const pi = event.data.object as Stripe.PaymentIntent;
      const holdId = pi.metadata?.hold_id;
      if (holdId) {
        await supabase
          .from('holds')
          .update({ state: 'released' })
          .eq('id', holdId);
      }
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      const piId = charge.payment_intent as string;
      if (piId) {
        await supabase
          .from('holds')
          .update({ state: 'refunded' })
          .eq('stripe_pi_id', piId);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
