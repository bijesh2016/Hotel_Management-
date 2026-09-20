import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSync } from '../context/SyncContext';
import { useAuth } from '../context/AuthContext';
import PageHero from '../components/layout/PageHero';
import { FadeIn } from '../components/ui/Animate';
import { useNavigate } from 'react-router-dom';

export default function Rooms() {
  const { rooms, createBooking } = useSync();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookingRoom, setBookingRoom] = useState(null);
  const [guestName, setGuestName] = useState(user?.full_name || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [checkInDate, setCheckInDate] = useState('2026-10-10');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-13');
  const [guestCount, setGuestCount] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [roomTypeFilter, setRoomTypeFilter] = useState('all');

  const filteredRooms = rooms.filter(
    (r) => roomTypeFilter === 'all' || r.room_type?.toLowerCase().includes(roomTypeFilter)
  );

  const handleOpenBookingModal = (room) => {
    setBookingRoom(room);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!bookingRoom) return;

    setIsSubmitting(true);
    await createBooking({
      user_name: guestName || 'Valued Guest',
      user_email: guestEmail || 'guest@example.com',
      hotel_id: bookingRoom.hotel_id || 1,
      hotel_name: bookingRoom.hotel_name || 'Himalayan Luxury Hotel',
      room_id: bookingRoom.id,
      room_type: bookingRoom.room_type,
      check_in: checkInDate,
      check_out: checkOutDate,
      guests: Number(guestCount),
      total_amount: (Number(bookingRoom.price_per_night) || 200) * 3
    });

    setIsSubmitting(false);
    setBookingRoom(null);
    navigate('/my-bookings');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <PageHero
        title="Luxury Suites & Himalayan Rooms"
        subtitle="Live synced room availability with instant confirmation and 24/7 guest service."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Rooms' }]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {/* Filter Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛏️</span>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Select Room Category</h3>
              <p className="text-xs text-slate-500">Filter by suite type</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {['all', 'suite', 'deluxe', 'royal'].map((type) => (
              <button
                key={type}
                onClick={() => setRoomTypeFilter(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
                  roomTypeFilter === type
                    ? 'bg-primary-700 text-white shadow-md shadow-primary-700/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type === 'all' ? 'All Rooms' : `${type}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Room List */}
        <FadeIn>
          <div className="grid gap-8 md:grid-cols-2">
            {filteredRooms.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.room_type}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-lg">
                      {room.hotel_name}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                      <div>
                        <span className="text-xs text-teal-300 font-mono">Room {room.room_number || '#101'}</span>
                        <h3 className="text-2xl font-bold font-display">{room.room_type}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-accent-300">${room.price_per_night}</span>
                        <span className="text-xs text-slate-300 block">/ night</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-slate-600 text-sm leading-relaxed">{room.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(room.amenities || ['Jacuzzi', 'King Bed', 'Mountain View', 'Wi-Fi']).map((a) => (
                        <span key={a} className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                          ✓ {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    Capacity: <span className="font-bold text-slate-800">{room.capacity || 2} Guests</span>
                  </div>
                  <button
                    onClick={() => handleOpenBookingModal(room)}
                    className="btn-accent py-2.5 px-6 text-xs font-bold shadow-lg shadow-accent-500/20"
                  >
                    ⚡ Reserve Instant Stay
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Instant Booking Modal */}
        <AnimatePresence>
          {bookingRoom && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
              >
                <button
                  onClick={() => setBookingRoom(null)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 text-lg"
                >
                  ✕
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl font-bold">
                    🏨
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{bookingRoom.room_type}</h3>
                    <p className="text-xs text-slate-500">{bookingRoom.hotel_name} • ${bookingRoom.price_per_night}/night</p>
                  </div>
                </div>

                <form onSubmit={handleConfirmBooking} className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Guest Full Name</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="John Doe"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Check In Date</label>
                      <input
                        type="date"
                        required
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Check Out Date</label>
                      <input
                        type="date"
                        required
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Number of Guests</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="input-field"
                    >
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Guests (Family)</option>
                      <option value="4">4 Guests (Full Suite)</option>
                    </select>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center text-sm">
                    <span className="text-slate-600">Estimated Total Stay (3 Nights):</span>
                    <span className="text-xl font-extrabold text-slate-900">${(Number(bookingRoom.price_per_night) || 200) * 3}</span>
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setBookingRoom(null)}
                      className="px-5 py-2.5 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 text-sm"
                    >
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="btn-primary py-2.5 px-6">
                      {isSubmitting ? 'Confirming...' : '✨ Confirm & Sync Reservation'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
