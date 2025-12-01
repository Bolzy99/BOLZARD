/* global Set */
"use client";

import { useEffect, useState, useRef } from "react";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const totalStations = 8;
const salonName = "Luxe Beauty Bar, Singapore";
const sgTimeZone = "Asia/Singapore";

function getTodayISO() {
  const now = new Date();
  const zonedDate = toZonedTime(now, sgTimeZone);
  return format(zonedDate, 'yyyy-MM-dd');
}

export default function CosmeticDashboard() {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: "", date: "", time: "", service: "", contact: "",
  });
  const [dateSelected, setDateSelected] = useState(getTodayISO());
  const [isClient, setIsClient] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const fetchBookings = async () => {
    const response = await fetch('/api/salon-bookings'); 
    if (response.ok) {
      const data = await response.json();
      setBookings(data);
    } else {
      console.error("Failed to fetch bookings.");
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
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

  const bookedDates = new Set(bookings.map(b => b.date));
  
  const handleDayClick = (day) => {
    if(!day) return;
    const selectedDate = format(day, 'yyyy-MM-dd');
    setDateSelected(selectedDate);
    setShowCalendar(false);
  };

  async function handleAddBooking(e) {
    e.preventDefault();
    const finalModalData = { ...modalData, bookedBy: "Staff" };

    const response = await fetch('/api/salon-bookings', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalModalData),
    });

    if (response.ok) {
      await fetchBookings();
      setShowModal(false);
      alert(`Booking confirmed for ${finalModalData.name} on ${finalModalData.date} at ${finalModalData.time}!`);
      setModalData({ name: "", date: dateSelected, time: "", service: "", contact: "" });
    } else {
      const error = await response.json();
      alert(`Failed to add booking: ${error.message}`);
    }
  }

  async function handleRemoveBooking(bookingToRemove) {
    const response = await fetch('/api/salon-bookings', { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingToRemove),
    });

    if (response.ok) {
        await fetchBookings();
        alert(`Successfully cancelled booking for ${bookingToRemove.name}.`);
    } else {
        alert('Failed to delete booking.');
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

  const viewBookings = bookings.filter((b) => b.date === dateSelected);

  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-[#1c1917] text-white font-sans pb-14 receptionist-dashboard">
      {/* Rose Gold & Amber Gradient Header */}
      <div className="w-full bg-gradient-to-r from-rose-900 via-amber-900/80 to-stone-900 py-8 px-2 flex flex-col items-center shadow-lg border-b border-rose-500/20">
        <img
          src="/demo-assets/salon-logo.png"
          alt="Salon Logo"
          className="mb-4 w-16 h-16 rounded-full shadow-md object-cover border border-rose-200/30"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight drop-shadow-xl uppercase text-center text-rose-50">
          Salon Dashboard
        </h1>
        <div className="flex flex-col md:flex-row md:gap-8 gap-1 items-center text-[1.09rem] text-rose-100/90 font-medium">
          <span>{salonName}</span>
          <span>
            <span className="hidden md:inline">| </span>
            <span>Date:</span>
            <div className="inline-block relative ml-2" ref={calendarRef}>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="appearance-none bg-white/10 rounded-xl px-4 py-2 border border-rose-200/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer hover:bg-white/20"
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
                      hasBooking: Array.from(bookedDates).map(dateStr => new Date(dateStr + 'T00:00'))
                    }}
                    modifiersClassNames={{
                      hasBooking: 'has-booking'
                    }}
                    className="bg-[#292524] text-white rounded-lg shadow-2xl border border-rose-500/30 p-2"
                  />
                </div>
              )}
            </div>
          </span>
          <span>
            <span className="hidden md:inline">| </span>
            Active Stations: <strong>{totalStations}</strong>
          </span>
        </div>
      </div>

      {/* Elegant Rose/Gold Calendar Styling */}
      <style jsx global>{`
        :root {
            --rdp-cell-size: 40px;
            --rdp-accent-color: #fb7185; /* Rose-400 */
            --rdp-background-color: rgba(251, 113, 133, 0.1);
            --rdp-font-family: inherit;
        }
        .rdp-caption_label {
            font-weight: 600 !important;
            font-size: 1rem !important;
            color: #fecdd3; /* Rose-100 */
        }
        .rdp-nav_button {
            color: #fda4af; /* Rose-300 */
            transition: color 0.2s;
        }
        .rdp-nav_button:hover {
            color: #fff;
        }
        .has-booking {
            position: relative;
        }
        .has-booking::after {
            content: '';
            position: absolute;
            bottom: 6px;
            left: 50%;
            transform: translateX(-50%);
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #fbbf24; /* Amber-400 */
        }
        .rdp-day_today:not(.rdp-day_selected) {
            background-color: #fbbf24 !important;
            color: #000 !important;
            font-weight: bold;
            border-radius: 0.375rem !important;
        }
        .rdp-day_selected, .rdp-day_selected:focus, .rdp-day_selected:hover {
            background-color: #be123c !important; /* Rose-700 */
            color: #fff !important;
            font-weight: bold;
            border-radius: 0.375rem !important;
        }
        .rdp-head_cell {
            color: #d6d3d1; /* Stone-300 */
            font-size: 0.8rem;
            font-weight: 500;
        }
        .rdp-day:hover:not(.rdp-day_selected) {
            background-color: rgba(251, 113, 133, 0.2);
            border-radius: 0.375rem;
        }
      `}</style>
      
      <section className="max-w-5xl mx-auto bg-stone-900/50 mt-8 rounded-2xl shadow-lg overflow-x-auto p-4 md:p-8 border border-stone-800">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-center sm:text-left flex-shrink-0 text-rose-100">
            Today's Schedule
          </h2>
          <div className="flex gap-4">
            <button
              className={`px-5 py-2 rounded-xl font-semibold shadow transition outline-none ${
                deleteMode
                  ? "bg-stone-700 text-white ring-2 ring-red-500"
                  : "bg-red-900/80 hover:bg-red-800 text-white border border-red-700"
              }`}
              onClick={() => setDeleteMode(!deleteMode)}
            >
              {deleteMode ? "Cancel" : "Cancel Booking"}
            </button>
            <button
              className="bg-rose-700 hover:bg-rose-600 text-white px-5 py-2 rounded-xl font-semibold shadow transition outline-none border border-rose-600"
              onClick={() => {
                setModalData(prev => ({...prev, date: dateSelected, time: "11:00"}));
                setShowModal(true);
              }}
            >
              + Add Booking
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 text-center">
            <thead>
              <tr className="bg-stone-800 text-rose-100 text-[1.09rem]">
                <th className="py-2 px-3 rounded-l-xl">Client Name</th>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Service</th>
                <th className="py-2 px-3">Contact</th>
                <th className="py-2 px-3 rounded-r-xl">Booked By</th>
              </tr>
            </thead>
            <tbody>
              {viewBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-stone-400 py-4">
                    No bookings for this day.
                  </td>
                </tr>
              )}
              {viewBookings.map((b, idx) => (
                <tr
                  key={idx}
                  className={`bg-stone-800/40 text-stone-200 transition-colors ${
                    deleteMode
                      ? "cursor-pointer hover:bg-red-900/30"
                      : "cursor-default"
                  }`}
                  onClick={() => {
                    if (deleteMode) {
                      handleRemoveBooking(b);
                    }
                  }}
                >
                  <td className="py-2 px-3 font-semibold rounded-l-xl text-white">{b.name}</td>
                  <td className="py-2 px-3">{getDayString(b.date).split(",")[0]}</td>
                  <td className="py-2 px-3">{b.time}</td>
                  <td className="py-2 px-3 text-amber-200">{b.service}</td>
                  <td className="py-2 px-3">{b.contact}</td>
                  <td className="py-2 px-3 rounded-r-xl">{b.bookedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-6">
          <img
            src="/demo-assets/salon-interior.jpg"
            alt="Salon Interior"
            className="w-full md:w-64 h-36 md:h-40 object-cover rounded-xl shadow-md border border-stone-700"
          />
          <img
            src="/demo-assets/salon-detail.jpg"
            alt="Nail Art Detail"
            className="w-full md:w-56 h-36 md:h-40 object-cover rounded-xl shadow-md border border-stone-700"
          />
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4 backdrop-blur-sm">
          <form
            className="bg-[#292524] rounded-2xl shadow-2xl p-6 w-full max-w-md space-y-4 text-white border border-rose-900/50 relative"
            onSubmit={handleAddBooking}
            autoComplete="off"
          >
            <button
              type="button"
              className="absolute right-4 top-4 text-2xl font-bold text-stone-400 hover:text-white"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2 text-center text-rose-100">Add Booking</h3>
            <input
              className="w-full p-3 border border-stone-600 rounded-lg bg-stone-800 text-white placeholder-stone-400 focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="Client Name"
              required
              value={modalData.name}
              onChange={e => setModalData({ ...modalData, name: e.target.value })}
            />
            <div className="flex flex-col gap-4">
              <input
                type="date"
                className="w-full p-3 border border-stone-600 rounded-lg bg-stone-800 text-white focus:ring-2 focus:ring-rose-500 outline-none"
                value={modalData.date}
                min={isClient ? getTodayISO() : ''}
                onChange={e => setModalData({ ...modalData, date: e.target.value })}
                required
              />
              <input
                type="time"
                className="w-full p-3 border border-stone-600 rounded-lg bg-stone-800 text-white focus:ring-2 focus:ring-rose-500 outline-none"
                value={modalData.time}
                onChange={e => setModalData({ ...modalData, time: e.target.value })}
                required
              />
            </div>
            <select
              className="w-full p-3 border border-stone-600 rounded-lg bg-stone-800 text-white focus:ring-2 focus:ring-rose-500 outline-none"
              value={modalData.service}
              onChange={e => setModalData({ ...modalData, service: e.target.value })}
              required
            >
              <option value="">Select Service</option>
              <option value="Haircut & Style">Haircut & Style</option>
              <option value="Hair Color">Hair Color</option>
              <option value="Manicure">Manicure</option>
              <option value="Pedicure">Pedicure</option>
              <option value="Gel Nails">Gel Nails</option>
              <option value="Facial Treatment">Facial Treatment</option>
              <option value="Makeup">Makeup</option>
            </select>
            <input
              className="w-full p-3 border border-stone-600 rounded-lg bg-stone-800 text-white placeholder-stone-400 focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="Contact Number"
              required
              value={modalData.contact}
              onChange={e => setModalData({ ...modalData, contact: e.target.value })}
            />
            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-rose-700 to-pink-700 hover:from-rose-600 hover:to-pink-600 text-white rounded-lg p-3 font-bold shadow-lg transform transition hover:scale-[1.02]"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      )}
      <footer className="w-full text-center mt-12 py-6 text-stone-500 text-sm">
        &copy; {new Date().getFullYear()} {salonName} | Managed by BOLZARD
      </footer>
    </main>
  );
}