import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SEED_FACILITIES = [
  { id: 1, name: 'Free High-Speed Wi-Fi', icon: '📶', category: 'Connectivity', description: 'Gigabit fiber optic connection in all suites and public lounges.' },
  { id: 2, name: 'Infinity Pool & Spa', icon: '🏊', category: 'Wellness', description: 'Heated outdoor panoramic infinity pool looking onto mountain peaks.' },
  { id: 3, name: 'Fine Dining Restaurant', icon: '🍽️', category: 'Dining', description: 'Multi-cuisine gourmet dining with organic Himalayan ingredients.' },
  { id: 4, name: 'Helipad Access', icon: '🚁', category: 'Transport', description: 'Private direct helipad transfers to Everest Base Camp.' },
  { id: 5, name: 'Elephant & Jungle Safaris', icon: '🐘', category: 'Adventure', description: 'Guided jungle excursions and wildlife viewing safaris in Chitwan.' },
  { id: 6, name: '24/7 Royal Butler', icon: '🤵', category: 'Service', description: 'Dedicated personal concierge and butler assistance for presidential suites.' }
];

export default function Facilities() {
  const [facilities, setFacilities] = useState(SEED_FACILITIES);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('✨');
  const [category, setCategory] = useState('Wellness');
  const [description, setDescription] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name) return;

    const newFacility = {
      id: Date.now(),
      name,
      icon,
      category,
      description: description || 'Premium resort amenity provided for all guests.'
    };

    setFacilities([newFacility, ...facilities]);
    setName('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white font-display">Resort Facilities & Amenities</h2>
          <p className="text-xs text-slate-400 mt-1">Configure global hotel amenities, spa features, and dining offerings.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-accent py-2.5 px-5 text-xs font-bold shadow-lg shadow-accent-500/20"
        >
          + Add Amenity
        </button>
      </div>

      {/* Facilities Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.map((f) => (
          <div
            key={f.id}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3 hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl">
                  {f.icon}
                </div>
                <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2.5 py-0.5 rounded-full">
                  {f.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mt-4 font-display">{f.name}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{f.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
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
              <h3 className="text-2xl font-bold font-display">Add Resort Amenity</h3>
              <p className="text-xs text-slate-400 mt-0.5">Appears on hotel details and room cards.</p>

              <form onSubmit={handleAdd} className="mt-6 space-y-4 text-xs">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Amenity Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Heated Sauna"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase">Emoji Icon</label>
                    <input
                      type="text"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-center text-lg text-white outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1 uppercase">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-teal-400"
                  >
                    <option value="Wellness">Wellness & Spa</option>
                    <option value="Dining">Dining & Bar</option>
                    <option value="Adventure">Adventure & Tours</option>
                    <option value="Service">Service & Concierge</option>
                    <option value="Connectivity">Connectivity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1 uppercase">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter feature details..."
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
                  <button type="submit" className="btn-accent py-2.5 px-6">
                    ✨ Create Amenity
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
