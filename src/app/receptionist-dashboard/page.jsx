/* global Set */
"use client";

import { useEffect, useState, useRef } from "react";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
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

export default function ReceptionistDashboard() {
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: "", date: "", time: "", partySize: "", contact: "", specialRequest: "",
  });
  const [dateSelected, setDateSelected] = useState(getTodayISO());
  const [isClient, setIsClient] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

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
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

  useEffect(() => {
    setModalData(prev => ({...prev, date: dateSelected}));
  }, [dateSelected]);

  const reservationDatesWithBookings = new Set(reservations.map(r => r.date));
  
  const handleDayClick = (day) => {
    if(!day) return;
    const selectedDate = format(day, 'yyyy-MM-dd');
    setDateSelected(selectedDate);
    setShowCalendar(false);
  };

  async function handleAddReservation(e) {
    e.preventDefault();
    const finalModalData = { ...modalData, bookedBy: "Staff" };

    const response = await fetch('/api/reservations', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalModalData),
    });

    if (response.ok) {
      await fetchReservations();
      setShowModal(false);
      alert(`Reservation confirmed for ${finalModalData.name} on ${finalModalData.date} at ${finalModalData.time}!`);
      setModalData({ name: "", date: dateSelected, time: "", partySize: "", contact: "", specialRequest: "" });
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
    if (!date) return "";
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
            <div className="inline-block relative ml-2" ref={calendarRef}>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="appearance-none bg-white/20 rounded-xl px-4 py-2 border border-white/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all cursor-pointer"
              >
                {getDayString(dateSelected)}
              </button>
              {showCalendar && (
                <div className="absolute top-full mt-2 z-50 left-1/2 -translate-x-1/2">
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
                    className="bg-[#27272a] text-white rounded-lg shadow-2xl border border-white/10 p-2"
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

      <style jsx global>{`
        :root {
            --rdp-cell-size: 40px;
            --rdp-accent-color: #db2777; /* pink-600 */
            --rdp-background-color: rgba(219, 39, 119, 0.1);
            --rdp-font-family: inherit;
        }
        .rdp-caption_label {
            font-weight: 600 !important;
            font-size: 1rem !important;
            color: #f4f4f5; /* zinc-100 */
        }
        .rdp-nav_button {
            color: #a1a1aa; /* zinc-400 */
            transition: color 0.2s;
        }
        .rdp-nav_button:hover {
            color: #fff;
        }
        .has-reservation {
            position: relative;
        }
        .has-reservation::after {
            content: '';
            position: absolute;
            bottom: 6px;
            left: 50%;
            transform: translateX(-50%);
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #10b981; /* Vibrant green */
        }
        .rdp-day_today:not(.rdp-day_selected) {
            background-color: #10b981 !important;
            color: #fff !important;
            font-weight: bold;
            border-radius: 0.375rem !important;
        }
        .rdp-day_today.rdp-day_selected {
           color: #fff !important;
        }
        .rdp-day_selected, .rdp-day_selected:focus, .rdp-day_selected:hover {
            background-color: #db2777 !important;
            color: #fff !important;
            font-weight: bold;
            border-radius: 0.375rem !important;
        }
        .rdp-head_cell {
            color: #a1a1aa; /* zinc-400 */
            font-size: 0.8rem;
            font-weight: 500;
        }
        .rdp-day:hover:not(.rdp-day_selected) {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 0.375rem;
        }

        /* ✅ Fix mobile alignment for date/time inputs */
        input[type="date"],
        input[type="time"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100% !important;
          box-sizing: border-box;
          background-color: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding: 0.75rem;
          font-size: 1rem;
        }

        @media (max-width: 640px) {
          .sm\\:flex-row {
            flex-direction: column !important;
          }
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
              onClick={() => {
                setModalData(prev => ({...prev, date: dateSelected, time: "19:00"}));
                setShowModal(true);
              }}
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
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
          <form
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md space-y-4 text-black relative"
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
              className="w-full p-3 border rounded-lg bg-gray-100"
              placeholder="Customer Name"
              required
              value={modalData.name}
              onChange={e => setModalData({ ...modalData, name: e.target.value })}
            />
            <div className="flex flex-col gap-4">
              <input
                type="date"
                className="w-full p-3 border rounded-lg bg-gray-100"
                value={modalData.date}
                min={isClient ? getTodayISO() : ''}
                onChange={e => setModalData({ ...modalData, date: e.target.value })}
                required
              />
              <input
                type="time"
                className="w-full p-3 border rounded-lg bg-gray-100"
                value={modalData.time}
                onChange={e => setModalData({ ...modalData, time: e.target.value })}
                required
              />
            </div>
            <input
              className="w-full p-3 border rounded-lg bg-gray-100"
              placeholder="Number of People"
              type="number"
              min={1}
              value={modalData.partySize}
              onChange={e => setModalData({ ...modalData, partySize: e.target.value })}
              required
            />
            <input
              className="w-full p-3 border rounded-lg bg-gray-100"
              placeholder="Contact Number"
              required
              value={modalData.contact}
              onChange={e => setModalData({ ...modalData, contact: e.target.value })}
            />
            <input
              className="w-full p-3 border rounded-lg bg-gray-100"
              placeholder="Special Request (optional)"
              value={modalData.specialRequest}
              onChange={e => setModalData({ ...modalData, specialRequest: e.target.value })}
            />
            <button
              type="submit"
              className="w-full mt-4 bg-pink-700 hover:bg-pink-800 text-white rounded-lg p-3 font-bold shadow-lg"
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
