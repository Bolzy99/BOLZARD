import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase'; // Import the client

// GET: To fetch all reservations
export async function GET() {
  const { data, error } = await supabase
    .from('reservations')
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST: To create a new reservation
export async function POST(request) {
  const { name, date, time, partySize, contact, specialRequest, bookedBy } = await request.json();

  // Check for availability
  const { data: existing, error: checkError } = await supabase
    .from('reservations')
    .select('id')
    .eq('date', date)
    .eq('time', time);

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 });
  }

  if (existing && existing.length > 0) {
    return NextResponse.json({ message: 'This time slot is already booked.' }, { status: 409 });
  }

  // Insert the new reservation
  const { error: insertError } = await supabase
    .from('reservations')
    .insert([{ name, date, time, partySize, contact, specialRequest, bookedBy }]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Reservation created successfully' }, { status: 201 });
}

// DELETE: To remove a reservation
export async function DELETE(request) {
  const { name, date, time } = await request.json();

  if (!name || !date || !time) {
      return NextResponse.json({ message: 'Missing required fields for deletion.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('reservations')
    .delete()
    .match({ name: name, date: date, time: time });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Reservation deleted' }, { status: 200 });
}

// PATCH: To check for time slot availability
export async function PATCH(request) {
  const { date, time } = await request.json();

  const { data, error } = await supabase
    .from('reservations')
    .select('id')
    .eq('date', date)
    .eq('time', time);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ available: data.length === 0 });
}
