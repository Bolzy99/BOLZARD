import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

// GET: Fetch all appointments
export async function GET() {
  const { data, error } = await supabase
    .from('appointments')
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: Create a new appointment
export async function POST(request) {
  const { name, date, time, service, contact, bookedBy } = await request.json();

  // Check for availability
  const { data: existing, error: checkError } = await supabase
    .from('appointments')
    .select('id')
    .eq('date', date)
    .eq('time', time);

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 });
  }

  if (existing && existing.length > 0) {
    return NextResponse.json({ message: 'This time slot is already booked.' }, { status: 409 });
  }

  // Insert the new appointment
  const { error: insertError } = await supabase
    .from('appointments')
    .insert([{ name, date, time, service, contact, bookedBy }]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Appointment created successfully' }, { status: 201 });
}

// DELETE: Remove an appointment
export async function DELETE(request) {
  const { name, date, time } = await request.json();

  if (!name || !date || !time) {
    return NextResponse.json({ message: 'Missing required fields for deletion.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('appointments')
    .delete()
    .match({ name: name, date: date, time: time });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Appointment deleted' }, { status: 200 });
}

// PATCH: Check time slot availability
export async function PATCH(request) {
  const { date, time } = await request.json();

  const { data, error } = await supabase
    .from('appointments')
    .select('id')
    .eq('date', date)
    .eq('time', time);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ available: data.length === 0 });
}

