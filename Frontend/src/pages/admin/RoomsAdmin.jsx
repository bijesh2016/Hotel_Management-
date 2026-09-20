import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSync } from '../../context/SyncContext';

const emptyForm = {
  room_number: '',
  room_type: 'Presidential Suite',
  hotel_name: 'The Everest Luxury Resort',
  hotel_id: 1,
  price_per_night: 250,
  capacity: 2,
  description: 'Luxury suite with panoramic valley and mountain terrace view.',
  image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'
};

export default function RoomsAdmin() {
  const { rooms, hotels, createRoom } = useSync();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await createRoom({
      ...form,
      price_per_night: Number(form.price_per_night),
      capacity: Number(form.capacity)
    });

    setIsSubmitting(false);
    setShowModal(false);
    setForm(emptyForm);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-2xl font-bold text-white font-display">Room Inventory & Availability</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage suites, room pricing, capacities, and live availability status.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-accent py-2.5 px-5 text-xs font-bold shadow-lg shadow-accent-500/20 shrink-0"
        >
          + Add New Room
        </button>
      </div>

      {/* Rooms Table */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Room No</th>
                <th className="px-6 py-4">Room Category</th>
                <th className="px-6 py-4">Hotel Property</th>
                <th className="px-6 py-4">Price / Night</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 font-bold font-mono text-teal-400">{room.room_number || 'E-101'}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{room.room_type}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{room.description}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-300">{room.hotel_name}</td>
                  <td className="px-6 py-4 font-extrabold text-white text-sm">${room.price_per_night}</td>
                  <td className="px-6 py-4 text-slate-300">{room.capacity || 2} Guests</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      ● {room.status || 'Available'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Room Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-white"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
                ✕
              </button>
              <h3 className="text-2xl font-bold font-display">Add Room Listing</h3>
              <p className="text-xs text-slate-400 mt-0.5">Will immediately synchronize with customer room search.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Room Number</label>
                    <input
                      type="text"
                      required
                      value={form.room_number}
                      onChange={(e) => setForm({ ...form, room_number: e.target.value })}
                      placeholder="E-505"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Hotel Property</label>
                    <select
                      value={form.hotel_name}
                      onChange={(e) => setForm({ ...form, hotel_name: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                    >
                      {hotels.map((h) => (
                        <option key={h.id} value={h.name}>{h.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Room Category</label>
                    <input
                      type="text"
                      required
                      value={form.room_type}
                      onChange={(e) => setForm({ ...form, room_type: e.target.value })}
                      placeholder="Presidential Suite"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Rate ($ / Night)</label>
                    <input
                      type="number"
                      required
                      value={form.price_per_night}
                      onChange={(e) => setForm({ ...form, price_per_night: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1 uppercase">Description & Amenities</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Jacuzzi, sunrise balcony, king bed..."
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl text-slate-400 font-semibold hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn-accent py-2.5 px-6">
                    {isSubmitting ? 'Adding...' : '✨ Publish Room'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
