import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to our "database"
const filePath = path.join(process.cwd(), 'data', 'reservations.json');

// Function to read reservations from the file
const readReservations = () => {
  try {
    const jsonData = fs.readFileSync(filePath);
    return JSON.parse(jsonData);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    return [];
  }
};

// Function to write reservations to the file
const writeReservations = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET: To fetch all reservations
export async function GET() {
  const reservations = readReservations();
  return NextResponse.json(reservations);
}

// POST: To create a new reservation (with availability check)
export async function POST(request) {
  const newReservation = await request.json();
  const allReservations = readReservations();

  // --- Availability Check Logic ---
  const isSlotTaken = allReservations.some(
    (res) => res.date === newReservation.date && res.time === newReservation.time
  );

  if (isSlotTaken) {
    // Return a 409 Conflict error if the time slot is already booked
    return NextResponse.json(
      { message: 'This time slot is already booked.' },
      { status: 409 }
    );
  }
  // --- End of Availability Check ---

  allReservations.push(newReservation);
  writeReservations(allReservations);

  // Return a 201 Created success status
  return NextResponse.json(newReservation, { status: 201 });
}

// DELETE: To remove a reservation
export async function DELETE(request) {
  const { name, date, time } = await request.json(); // Identify reservation to delete
  let allReservations = readReservations();

  const initialLength = allReservations.length;
  const updatedReservations = allReservations.filter(
    (res) => !(res.name === name && res.date === date && res.time === time)
  );

  if (updatedReservations.length === initialLength) {
    return NextResponse.json({ message: 'Reservation not found.' }, { status: 404 });
  }

  writeReservations(updatedReservations);
  return NextResponse.json({ message: 'Reservation deleted.' }, { status: 200 });
}

// --- NEW ---
// PATCH: To check for time slot availability
export async function PATCH(request) {
  try {
    const { date, time } = await request.json();
    const allReservations = readReservations();

    const isSlotTaken = allReservations.some(
      (res) => res.date === date && res.time === time
    );

    // Return the availability status
    return NextResponse.json({ available: !isSlotTaken });
  } catch (error) {
    // If the request body is malformed or missing data
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }
}
