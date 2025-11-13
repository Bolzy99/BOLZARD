/* global Set */
"use client";

import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
// --- NEW: Import the calendar component and its CSS ---
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


const totalSeats = 60;
const restaurantName = "Big Food Restaurant, Singapore";
const sgTimeZone = "Asia/Singapore";

// This function remains the same
function getTodayISO() {
  const now = new Date();
  const zonedDate = toZonedTime(now, sgTimeZone);
  return format(zonedDate, 'yyyy-MM-dd');
}

// This function remains the same
const getNextNDaysISO = (n) => {
    const dates = [];
    const baseDate = toZonedTime(new Date(), sgTimeZone);
    for (let i = 0; i < n; i++) {
        const date = new Date(baseDate);
        date.setDate(date.getDate() + i);
        const zonedDate = toZonedTime(date, sgTimeZone);
        dates.push(format(zonedDate, 'yyyy-MM-dd'));
    }
    return dates;
};

export default function ReceptionistDashboard() {
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: "", date: "", time: "", partySize: "", contact: "", specialRequest: "", bookedBy: "Staff",
  });
  const [dateSelected, setDateSelected] = useState(getTodayISO());
  const [isClient, setIsClient] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  // --- NEW: State to control the calendar's visibility ---
  const [showCalendar, setShowCalendar] = useState(false);

  const fetchReservations = async () => {
    const response = await fetch('/api/reservations'); 
    if (response.ok) {
      const data = await response.json();
      setReservations(data);
    } else {
      console.error("Failed to fetch reservations.");
      setReservations([]);
    }
  };

  useEffect(() => {
    fetchReservations();
    setIsClient(true);
  }, []);

  useEffect(() => {
    setModalData(prev => ({...prev, date: dateSelected}));
  }, [dateSelected, showModal]);

  // --- MODIFIED: Get a unique set of dates that have reservations ---
  const reservationDatesWithBookings = new Set(reservations.map(r => r.date));
  
  const handleDayClick = (day) => {
    const selectedDate = format(day, 'yyyy-MM-dd');
    setDateSelected(selectedDate);
    setShowCalendar(false); // Close the calendar after selecting a day
  };

  async function handleAddReservation(e) {
    e.preventDefault();
    const response = await fetch('/api/reservations', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modalData),
    });

    if (response.ok) {
      await fetchReservations();
      setShowModal(false);
      alert(`Reservation confirmed for ${modalData.name} on ${modalData.date} at ${modalData.time}!`);
      setModalData({ name: "", date: dateSelected, time: "", partySize: "", contact: "", specialRequest: "", bookedBy: "Staff" });
    } else {
      const error = await response.json();
      alert(`Failed to add reservation: ${error.message}`);
    }
  }

  async function handleRemoveReservation(reservationToRemove) {
    const response = await fetch('/api/reservations', { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationToRemove),
    });

    if (response.ok) {
        await fetchReservations();
        alert(`Successfully deleted reservation for ${reservationToRemove.name}.`);
    } else {
        alert('Failed to delete reservation.');
    }
    setDeleteMode(false);
  }
  
  const getDayString = (date) => {
    if (!date) return ""; // Guard against undefined date
    const [year, month, day] = date.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return toZonedTime(d, sgTimeZone).toLocaleDateString("en-SG", {
      year: "numeric", month: "long", day: "numeric", weekday: "long", timeZone: sgTimeZone,
    });
  }

  const viewReservations = reservations.filter((r) => r.date === dateSelected);

  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-[#18181b] text-white font-sans pb-14 receptionist-dashboard">
      <div className="w-full bg-gradient-to-r from-pink-500/80 via-purple-700/70 to-orange-400/70 py-8 px-2 flex flex-col items-center shadow-lg">
        <img
          src="/restaurant-logo.png"
          alt="Restaurant Logo"
          className="mb-4 w-16 h-16 rounded-full shadow-md object-cover"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight drop-shadow-xl uppercase text-center">
          Receptionist Dashboard
        </h1>
        <div className="flex flex-col md:flex-row md:gap-8 gap-1 items-center text-[1.09rem] text-white/90 font-medium">
          <span>{restaurantName}</span>
          <span>
            <span className="hidden md:inline">| </span>
            <span>Date:</span>
            {/* --- MODIFIED: This entire div is now the calendar button and popup --- */}
            <div className="inline-block relative ml-2">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="appearance-none bg-white/20 rounded-xl px-4 py-2 border border-white/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all cursor-pointer"
              >
                {getDayString(dateSelected)}
              </button>
              {showCalendar && (
                <div className="absolute top-full mt-2 z-50 bg-gray-800 text-white rounded-lg shadow-lg border border-white/10">
                  <DayPicker
                    mode="single"
                    selected={new Date(dateSelected + 'T00:00')}
                    onSelect={handleDayClick}
                    modifiers={{
                      hasReservation: Array.from(reservationDatesWithBookings).map(dateStr => new Date(dateStr + 'T00:00'))
                    }}
                    modifiersClassNames={{
                      hasReservation: 'has-reservation'
                    }}
                  />
                </div>
              )}
            </div>
          </span>
          <span>
            <span className="hidden md:inline">| </span>
            Total Seats: <strong>{totalSeats}</strong>
          </span>
        </div>
      </div>

      {/* --- NEW: Style block for the calendar --- */}
      <style jsx global>{`
        .rdp {
            --rdp-cell-size: 40px;
            --rdp-caption-font-size: 1rem;
            --rdp-accent-color: #ec4899; /* pink-500 */
            --rdp-background-color: #f9a8d4; /* pink-200 */
            --rdp-accent-color-dark: #be185d; /* pink-700 */
            --rdp-background-color-dark: #86198f; /* purple-800 */
            --rdp-outline: 2px solid var(--rdp-accent-color);
        }
        .has-reservation {
          font-weight: bold;
          color: #f9a8d4; /* A lighter pink to show up on the dark background */
          border: 1px solid #ec4899;
          border-radius: 50%;
        }
        .rdp-day_selected, .rdp-day_selected:hover {
            background-color: #db2777 !important;
            color: #fff !important;
        }
      `}</style>
      
      <section className="max-w-5xl mx-auto bg-white/10 mt-8 rounded-2xl shadow-lg overflow-x-auto p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-center sm:text-left flex-shrink-0">
            Upcoming Reservations
          </h2>
          <div className="flex gap-4">
            <button
              className={`px-5 py-2 rounded-xl font-semibold shadow transition outline-none ${
                deleteMode
                  ? "bg-gray-700 text-white ring-2 ring-red-500"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
              onClick={() => setDeleteMode(!deleteMode)}
            >
              {deleteMode ? "Cancel" : "Remove Reservation"}
            </button>
            <button
              className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-xl font-semibold shadow transition outline-none"
              onClick={() => setShowModal(true)}
            >
              + Add Reservation
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 text-center">
            <thead>
              <tr className="bg-purple-900/60 text-white text-[1.09rem]">
                <th className="py-2 px-3 rounded-l-xl">Name</th>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Party Size</th>
                <th className="py-2 px-3">Contact</th>
                <th className="py-2 px-3">Special Request</th>
                <th className="py-2 px-3 rounded-r-xl">Booked By</th>
              </tr>
            </thead>
            <tbody>
              {viewReservations.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-300 py-4">
                    No reservations for this day.
                  </td>
                </tr>
              )}
              {viewReservations.map((res, idx) => (
                <tr
                  key={idx}
                  className={`bg-white/30 text-black transition-colors ${
                    deleteMode
                      ? "cursor-pointer hover:bg-red-400/50"
                      : "cursor-default"
                  }`}
                  onClick={() => {
                    if (deleteMode) {
                      handleRemoveReservation(res);
                    }
                  }}
                >
                  <td className="py-2 px-3 font-semibold rounded-l-xl">{res.name}</td>
                  <td className="py-2 px-3">{getDayString(res.date).split(",")[0]}</td>
                  <td className="py-2 px-3">{res.time}</td>
                  <td className="py-2 px-3 text-center">{res.partySize}</td>
                  <td className="py-2 px-3">{res.contact}</td>
                  <td className="py-2 px-3">{res.specialRequest || "-"}</td>
                  <td className="py-2 px-3 rounded-r-xl">{res.bookedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-6">
          <img
            src="/restaurant-interior.jpg"
            alt="Restaurant Interior"
            className="w-full md:w-64 h-36 md:h-40 object-cover rounded-xl shadow-md border border-white/10"
          />
          <img
            src="/restaurant-dish.jpg"
            alt="Signature Dish"
            className="w-full md:w-56 h-36 md:h-40 object-cover rounded-xl shadow-md border border-white/10"
          />
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center">
          <form
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md space-y-3 text-black relative"
            onSubmit={handleAddReservation}
            autoComplete="off"
          >
            <button
              type="button"
              className="absolute right-4 top-4 text-2xl font-bold text-gray-400 hover:text-black"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2 text-center">Add Reservation</h3>
            <input
              className="w-full p-2 border rounded-lg bg-gray-100 mb-2"
              placeholder="Customer Name"
              required
              value={modalData.name}
              onChange={e => setModalData({ ...modalData, name: e.target.value })}
            />
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="date"
                className="w-full md:w-1/2 p-2 border rounded-lg bg-gray-100"
                value={modalData.date}
                min={isClient ? getTodayISO() : ''}
                onChange={e => setModalData({ ...modalData, date: e.target.value })}
                required
              />
              <input
                type="time"
                className="w-full md:w-1/2 p-2 border rounded-lg bg-gray-100"
                value={modalData.time}
                onChange={e => setModalData({ ...modalData, time: e.target.value })}
                required
              />
            </div>
            <input
              className="w-full p-2 border rounded-lg bg-gray-100 mb-2"
              placeholder="Number of People"
              type="number"
              min={1}
              value={modalData.partySize}
              onChange={e => setModalData({ ...modalData, partySize: e.target.value })}
              required
            />
            <input
              className="w-full p-2 border rounded-lg bg-gray-100 mb-2"
              placeholder="Contact Number"
              required
              value={modalData.contact}
              onChange={e => setModalData({ ...modalData, contact: e.target.value })}
            />
            <input
              className="w-full p-2 border rounded-lg bg-gray-100 mb-2"
              placeholder="Special Request (optional)"
              value={modalData.specialRequest}
              onChange={e => setModalData({ ...modalData, specialRequest: e.target.value })}
            />
            <div className="mt-2 flex items-center gap-2">
              <span className="font-semibold text-gray-600">Booked By:</span>
              <select
                className="border rounded px-2 py-1"
                value={modalData.bookedBy}
                onChange={e =>
                  setModalData({ ...modalData, bookedBy: e.target.value })
                }
              >
                <option>Staff</option>
                <option>AI Receptionist</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full mt-3 bg-pink-700 hover:bg-pink-800 text-white rounded-lg p-2 font-bold shadow"
            >
              Confirm Reservation
            </button>
          </form>
        </div>
      )}
      <footer className="w-full text-center mt-12 py-6 text-white/60 text-sm">
        &copy; {new Date().getFullYear()} {restaurantName} | Reservations managed by BOLZARD
      </footer>
    </main>
  );
}
