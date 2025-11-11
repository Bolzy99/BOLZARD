import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// This path should point to public/data/reservations.json
const filePath = path.join(process.cwd(), 'public', 'data', 'reservations.json');

// --- Helper functions with logging ---
const readReservations = () => {
  console.log('Attempting to read reservations from:', filePath);
  try {
    if (!fs.existsSync(filePath)) {
      console.log('File does not exist, returning empty array.');
      return [];
    }
    const jsonData = fs.readFileSync(filePath, 'utf8');
    console.log('Successfully read file content.');
    return jsonData ? JSON.parse(jsonData) : [];
  } catch (error) {
    console.error('Error reading reservations file:', error);
    // Return empty array on error to prevent crashing the app
    return [];
  }
};

const writeReservations = (data) => {
  console.log('Attempting to write reservations to:', filePath);
  try {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      console.log('Directory does not exist, creating it.');
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('Successfully wrote to file.');
  } catch (error) {
    console.error('Error writing reservations file:', error);
    // Re-throw the error to indicate the write operation failed
    throw error;
  }
};

// --- API Functions with Logging ---

export async function GET(request) {
  console.log('--- Received GET Request ---');
  try {
    const reservations = readReservations();
    return NextResponse.json(reservations);
  } catch (error) {
    console.error('[GET] Caught error:', error);
    return NextResponse.json({ message: 'Failed to read reservations.' }, { status: 500 });
  }
}

export async function POST(request) {
  console.log('--- Received POST Request ---');
  try {
    const newReservation = await request.json();
    console.log('POST body:', newReservation);
    
    const allReservations = readReservations();
    const isSlotTaken = allReservations.some(
      (res) => res.date === newReservation.date && res.time === newReservation.time
    );

    if (isSlotTaken) {
      console.log('Slot is already taken. Returning 409.');
      return NextResponse.json({ message: 'This time slot is already booked.' }, { status: 409 });
    }

    allReservations.push(newReservation);
    writeReservations(allReservations);

    console.log('Reservation added successfully.');
    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error('[POST] Caught error:', error);
    return NextResponse.json({ message: 'Failed to create reservation.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  console.log('--- Received DELETE Request ---');
  try {
    const reservationToDelete = await request.json();
    console.log('DELETE body:', reservationToDelete);

    let allReservations = readReservations();
    const initialLength = allReservations.length;

    const updatedReservations = allReservations.filter(
      (res) =>
        !(res.name === reservationToDelete.name &&
          res.date === reservationToDelete.date &&
          res.time === reservationToDelete.time)
    );

    if (updatedReservations.length === initialLength) {
      console.log('Reservation to delete not found.');
      return NextResponse.json({ message: 'Reservation not found.' }, { status: 404 });
    }

    writeReservations(updatedReservations);
    console.log('Reservation deleted successfully.');
    return NextResponse.json({ message: 'Reservation deleted.' });
  } catch (error) {
    console.error('[DELETE] Caught error:', error);
    return NextResponse.json({ message: 'Failed to delete reservation.' }, { status: 500 });
  }
}

export async function PATCH(request) {
  console.log('--- Received PATCH Request ---');
  try {
    const { date, time } = await request.json();
    console.log('PATCH body:', { date, time });

    const allReservations = readReservations();
    const isSlotTaken = allReservations.some(
      (res) => res.date === date && res.time === time
    );

    console.log('Availability check result:', { available: !isSlotTaken });
    return NextResponse.json({ available: !isSlotTaken });
  } catch (error) {
    console.error('[PATCH] Caught error:', error);
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }
}
