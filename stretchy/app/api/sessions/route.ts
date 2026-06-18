import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: host, error: hostError } = await supabase
    .from('hosts')
    .select('id')
    .eq('auth_user_id', user.id)
    .single();

  if (hostError || !host) {
    return NextResponse.json({ error: 'Host profile not found' }, { status: 403 });
  }

  const body = await req.json();
  const {
    name,
    type,
    duration,
    date,
    time,
    locationName,
    locationAddress,
    gettingThere,
    socialStretch,
    description,
    whatToBring,
    target,
    minSpots,
    maxSpots,
  } = body;

  if (!name?.trim()) return NextResponse.json({ error: 'Session name is required' }, { status: 400 });
  if (!type) return NextResponse.json({ error: 'Session type is required' }, { status: 400 });
  if (!duration) return NextResponse.json({ error: 'Duration is required' }, { status: 400 });
  if (!date || !time) return NextResponse.json({ error: 'Date and time are required' }, { status: 400 });
  if (!locationName?.trim()) return NextResponse.json({ error: 'Location name is required' }, { status: 400 });

  const startsAt = new Date(`${date}T${time}:00`);
  if (isNaN(startsAt.getTime())) {
    return NextResponse.json({ error: 'Invalid date or time' }, { status: 400 });
  }

  const endsAt = new Date(startsAt.getTime() + Number(duration) * 60 * 1000);

  const insertPayload: Record<string, unknown> = {
    host_id: host.id,
    title: name.trim(),
    movement_type: type,
    starts_at: startsAt.toISOString(),
    ends_at: endsAt.toISOString(),
    location_name: locationName.trim(),
    location_address: locationAddress?.trim() || null,
    description: description?.trim() || null,
    host_target: Number(target),
    min_attendees: Number(minSpots),
    max_attendees: Number(maxSpots),
    state: 'open',
  };

  if (gettingThere?.trim()) insertPayload.getting_there = gettingThere.trim();
  if (socialStretch?.trim()) insertPayload.social_stretch_venue = socialStretch.trim();
  if (Array.isArray(whatToBring) && whatToBring.length > 0) insertPayload.what_to_bring = whatToBring;

  const { data: session, error: insertError } = await supabase
    .from('sessions')
    .insert(insertPayload)
    .select()
    .single();

  if (insertError) {
    console.error('Session insert error:', insertError);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }

  return NextResponse.json({ session }, { status: 201 });
}
