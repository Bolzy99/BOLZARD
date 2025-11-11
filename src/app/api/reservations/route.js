import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// --- CORRECTED FILE PATH ---
// This now points to the /public directory, which is the standard place for such files.
const filePath = path.join(process.cwd(), 'public', 'data', 'reservations.json');

const readReservations = () => {
  try {
    // Specify 'utf8' encoding to read the file correctly
    const jsonData = fs.readFileSync(filePath, 'utf8');
    // If the file is empty, JSON.parse will fail. Return an empty array in that case.
    return jsonData ? JSON.parse(jsonData) : [];
  } catch (error) {
    // If the file doesn't exist, it's not an error; it just means no reservations yet.
    if (error.code === 'ENOENT') {
      return [];
    }
    // For other errors, re-throw them
    throw error;
  }
};

const writeReservations = (data) => {
  // Ensure the directory exists before writing to it.
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
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

  const isSlotTaken = allReservations.some(
    (res) => res.date === newReservation.date && res.time === newReservation.time
  );

  if (isSlotTaken) {
    return NextResponse.json(
      { message: 'This time slot is already booked.' },
      { status: 409 }
    );
  }

  allReservations.push(newReservation);
  writeReservations(allReservations);

  return NextResponse.json(newReservation, { status: 201 });
}

// DELETE: To remove a reservation
export async function DELETE(request) {
  const reservationToDelete = await request.json();
  let allReservations = readReservations();

  const initialLength = allReservations.length;

  // --- More Specific Delete Logic ---
  // This ensures we only delete the exact reservation that was sent.
  const updatedReservations = allReservations.filter(
    (res) => 
      !(res.name === reservationToDelete.name && 
        res.date === reservationToDelete.date && 
        res.time === reservationToDelete.time)
  );

  if (updatedReservations.length === initialLength) {
    return NextResponse.json({ message: 'Reservation not found.' }, { status: 404 });
  }

  writeReservations(updatedReservations);
  return NextResponse.json({ message: 'Reservation deleted.' }, { status: 200 });
}

// PATCH: To check for time slot availability
export async function PATCH(request) {
  try {
    const { date, time } = await request.json();
    const allReservations = readReservations();

    const isSlotTaken = allReservations.some(
      (res) => res.date === date && res.time === time
    );

    return NextResponse.json({ available: !isSlotTaken });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }
}
