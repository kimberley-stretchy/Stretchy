import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const { role, email, suburb } = await req.json();

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from('waitlist').insert({
      email: email.trim().toLowerCase(),
      role,
      suburb: suburb?.trim() || null,
    });

    if (error && error.code !== '23505') {
      console.error('Waitlist insert error:', error);
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Waitlist route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
