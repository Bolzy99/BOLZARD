import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

// GET: Fetch all bookings
export async function GET() {
  const { data, error } = await supabase
    .from('salon_bookings')
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: Create a new booking
export async function POST(request) {
  const { name, date, time, service, contact, bookedBy } = await request.json();

  // Check availability (simple check for same slot)
  const { data: existing, error: checkError } = await supabase
    .from('salon_bookings')
    .select('id')
    .eq('date', date)
    .eq('time', time);

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 });
  }

  if (existing && existing.length > 0) {
    return NextResponse.json({ message: 'This time slot is already booked.' }, { status: 409 });
  }

  const { error: insertError } = await supabase
    .from('salon_bookings')
    .insert([{ name, date, time, service, contact, bookedBy }]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Booking created successfully' }, { status: 201 });
}

// DELETE: Remove a booking
export async function DELETE(request) {
  const { name, date, time } = await request.json();

  const { error } = await supabase
    .from('salon_bookings')
    .delete()
    .match({ name, date, time });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Booking deleted' }, { status: 200 });
}

// PATCH: Check time slot availability (Required for your n8n workflow)
export async function PATCH(request) {
  try {
    const { date, time } = await request.json();

    // Query the database to see if any booking exists for this date/time
    const { data, error } = await supabase
      .from('salon_bookings')
      .select('id')
      .eq('date', date)
      .eq('time', time);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If data array is empty, it means the slot is available (true)
    // If data array has items, it means the slot is taken (false)
    const isAvailable = data.length === 0;

    return NextResponse.json({ available: isAvailable }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
