import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSync } from '../../context/SyncContext';

const emptyForm = {
  name: '',
  description: '',
  address: '',
  city: '',
  country: 'Nepal',
  star_rating: 5,
  price_per_night: 200,
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
};

export default function Hotels() {
  const { hotels, createHotel } = useSync();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHotels = hotels.filter((h) =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await createHotel({
      ...form,
      star_rating: Number(form.star_rating),
      price_per_night: Number(form.price_per_night)
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
          <h2 className="text-2xl font-bold text-white font-display">Hotel & Resort Catalog</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage properties, addresses, ratings, and amenity listings.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search hotel or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-teal-400"
          />
          <button
            onClick={() => setShowModal(true)}
            className="btn-accent py-2.5 px-5 text-xs font-bold shadow-lg shadow-accent-500/20 shrink-0"
          >
            + Register Hotel
          </button>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-slate-700 transition"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-slate-800">
                  {'★'.repeat(hotel.star_rating || 5)}
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest">{hotel.city}, {hotel.country}</span>
                  <h3 className="text-xl font-bold text-white font-display truncate">{hotel.name}</h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{hotel.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-300 border-t border-slate-800/80 pt-3">
                  <span>📍 {hotel.address}</span>
                  <span className="font-bold text-emerald-400">${hotel.price_per_night}/night</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Hotel Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-white"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold font-display">Register New Hotel</h3>
              <p className="text-xs text-slate-400 mt-0.5">Broadcasts instantly to customer facing pages.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1 uppercase">Hotel Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Grand Himalayan Spa & Resort"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">City / Region</label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Pokhara"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Star Rating</label>
                    <select
                      value={form.star_rating}
                      onChange={(e) => setForm({ ...form, star_rating: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                    >
                      <option value="5">5 Star Luxury ⭐⭐⭐⭐⭐</option>
                      <option value="4">4 Star Eco Resort ⭐⭐⭐⭐</option>
                      <option value="3">3 Star Boutique ⭐⭐⭐</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1 uppercase">Street Address</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Lakeside Road, Ward 6"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Starting Price ($/night)</label>
                    <input
                      type="number"
                      required
                      value={form.price_per_night}
                      onChange={(e) => setForm({ ...form, price_per_night: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Cover Image URL</label>
                    <input
                      type="url"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1 uppercase">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe amenities, view, and unique features..."
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
                    {isSubmitting ? 'Registering...' : '✨ Publish Hotel'}
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
