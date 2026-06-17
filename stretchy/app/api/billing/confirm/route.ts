import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const service = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { setupIntentId } = await req.json();
  if (!setupIntentId) return NextResponse.json({ error: 'setupIntentId required' }, { status: 400 });

  const si = await stripe.setupIntents.retrieve(setupIntentId);
  if (si.status !== 'succeeded') {
    return NextResponse.json({ error: 'Setup not complete' }, { status: 400 });
  }

  const pmId = typeof si.payment_method === 'string' ? si.payment_method : si.payment_method?.id;
  if (!pmId) return NextResponse.json({ error: 'No payment method' }, { status: 400 });

  await service
    .from('attendees')
    .update({ stripe_pm_id: pmId })
    .eq('auth_user_id', user.id);

  return NextResponse.json({ ok: true });
}
