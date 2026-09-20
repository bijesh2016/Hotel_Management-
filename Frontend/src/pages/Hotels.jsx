import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSync } from '../context/SyncContext';
import PageHero from '../components/layout/PageHero';
import HotelCard from '../components/ui/HotelCard';
import { FadeIn } from '../components/ui/Animate';

export default function Hotels() {
  const { hotels } = useSync();
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get('city') || '';

  const [searchQuery, setSearchQuery] = useState(initialCity);
  const [selectedCity, setSelectedCity] = useState(initialCity ? initialCity.toLowerCase() : 'all');
  const [selectedRating, setSelectedRating] = useState('all');

  // Cities list
  const cities = ['all', ...new Set(hotels.map((h) => h.city?.toLowerCase()).filter(Boolean))];

  // Filtered hotels
  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCity === 'all' || hotel.city.toLowerCase() === selectedCity;
    const matchesRating = selectedRating === 'all' || Number(hotel.star_rating) >= Number(selectedRating);

    return matchesSearch && matchesCity && matchesRating;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <PageHero
        title="Luxury Hotels & Boutique Resorts"
        subtitle="Discover authentic Nepalese heritage, mountain panoramas, and world-class spa retreats."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Hotels' }]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-slate-200/60 border border-slate-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Search Hotel or Location</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Kathmandu, Pokhara, Resort name..."
                  className="input-field pl-10"
                />
                <span className="absolute left-3.5 top-3.5 text-slate-400">🔍</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Filter by City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="input-field capitalize"
              >
                {cities.map((city) => (
                  <option key={city} value={city} className="capitalize">
                    {city === 'all' ? 'All Destinations' : city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Minimum Star Rating</label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="input-field"
              >
                <option value="all">Any Rating</option>
                <option value="5">5 Stars Only ⭐⭐⭐⭐⭐</option>
                <option value="4">4 Stars & Above ⭐⭐⭐⭐</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hotel Grid */}
        <FadeIn>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Available Properties ({filteredHotels.length})
            </h2>
            <span className="text-xs text-slate-500">Live Availability Updated</span>
          </div>
        </FadeIn>

        {filteredHotels.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <div className="text-5xl mb-3">🏨</div>
            <h3 className="text-xl font-bold text-slate-800">No matching hotels found</h3>
            <p className="text-slate-500 text-sm mt-1">Try resetting your search query or filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('all');
                setSelectedRating('all');
              }}
              className="mt-4 btn-ghost"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredHotels.map((hotel, i) => (
              <HotelCard key={hotel.id} hotel={hotel} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
