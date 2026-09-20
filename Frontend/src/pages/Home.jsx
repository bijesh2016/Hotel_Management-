import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSync } from '../context/SyncContext';
import HotelCard from '../components/ui/HotelCard';
import RoomCard from '../components/ui/RoomCard';
import { HeroText, FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animate';
import { IMAGES, SERVICES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAdmin, isHotelOwner } = useAuth();
  const { hotels, rooms, reviews } = useSync();
  const navigate = useNavigate();

  const [searchCity, setSearchCity] = useState('');
  const [searchGuests, setSearchGuests] = useState('2');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/hotels?city=${encodeURIComponent(searchCity)}&guests=${searchGuests}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-primary-950/40" />
        <div className="absolute inset-0 mesh-gradient opacity-50" />

        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl animate-float" />
        <div className="absolute -left-10 bottom-20 h-56 w-56 rounded-full bg-accent-500/15 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
          <HeroText>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-400 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-ping" />
              Nepal Premier Hotel Collection
            </div>
          </HeroText>

          <HeroText delay={0.15}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
              Experience Himalayan{' '}
              <span className="bg-gradient-to-r from-teal-300 via-accent-300 to-amber-200 bg-clip-text text-transparent">
                Royal Luxury
              </span>
            </h1>
          </HeroText>

          <HeroText delay={0.3}>
            <p className="mt-6 max-w-xl text-lg text-slate-300/90 leading-relaxed font-light">
              Panoramic mountain views, five-star heritage hospitality, and eco-wellness resorts synced in real-time.
            </p>
          </HeroText>

          {/* Interactive Hero Search Card */}
          <HeroText delay={0.4}>
            <form
              onSubmit={handleSearchSubmit}
              className="mt-8 max-w-4xl rounded-3xl bg-white/10 p-3 sm:p-4 backdrop-blur-2xl border border-white/20 shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-white/90 rounded-2xl p-3 backdrop-blur-sm">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Destination</label>
                <input
                  type="text"
                  placeholder="Kathmandu, Pokhara, Nagarkot..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 mt-0.5"
                />
              </div>

              <div className="bg-white/90 rounded-2xl p-3 backdrop-blur-sm">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Guests & Capacity</label>
                <select
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none mt-0.5"
                >
                  <option value="1">1 Guest (Single)</option>
                  <option value="2">2 Guests (Couple / Deluxe)</option>
                  <option value="4">4 Guests (Family Suite)</option>
                </select>
              </div>

              <button type="submit" className="btn-accent rounded-2xl h-full py-4 text-sm font-bold shadow-xl shadow-accent-500/30 flex items-center justify-center gap-2">
                🔍 Find Accommodations
              </button>
            </form>
          </HeroText>

          {/* Stats Bar */}
          <HeroText delay={0.6}>
            <div className="mt-14 flex flex-wrap gap-10 border-t border-white/10 pt-8">
              {[
                { value: `${hotels.length}+`, label: 'Partner Hotels' },
                { value: `${rooms.length}+`, label: 'Luxury Rooms' },
                { value: '4.9 ★', label: 'Guest Rating' },
                { value: '24/7', label: 'Live Concierge' }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</p>
                  <p className="text-xs font-medium text-slate-300 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </HeroText>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Handpicked Destinations</span>
                <h2 className="section-heading text-left mt-1">
                  Featured <span className="gradient-text">Hotels & Resorts</span>
                </h2>
              </div>
              <Link to="/hotels" className="btn-ghost self-start md:self-auto">
                Explore All Hotels →
              </Link>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hotels.slice(0, 3).map((hotel, i) => (
              <HotelCard key={hotel.id} hotel={hotel} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms Showcase */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Unrivaled Comfort</span>
              <h2 className="section-heading mt-1">
                Curated <span className="gradient-text">Suites & Rooms</span>
              </h2>
              <p className="text-slate-600 text-sm mt-3">
                Experience panoramic mountain view terraces, private jacuzzis, and personalized butler assistance.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-8">
            {rooms.slice(0, 2).map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>

          <FadeIn className="mt-12 text-center">
            <Link to="/rooms" className="btn-primary py-3.5 px-8">
              Browse All Available Rooms
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Live Guest Reviews Carousel */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-accent-400 uppercase tracking-widest">Real Guest Experiences</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              What Travellers <span className="text-accent-400">Say About Us</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((r, i) => (
              <motion.div
                key={r.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-3xl backdrop-blur-sm shadow-xl"
              >
                <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
                  {'★'.repeat(r.rating || 5)}
                </div>
                <p className="text-slate-300 text-sm italic leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{r.user_name}</span>
                  <span className="text-slate-400 font-mono">{r.hotel_name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="relative overflow-hidden py-28 bg-gradient-to-br from-primary-900 via-slate-900 to-teal-950 text-white text-center">
        <FadeIn className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold">Ready to Book Your Himalayan Escape?</h2>
          <p className="mt-4 text-slate-300 text-lg font-light">
            Instant booking confirmation, 100% price guarantee, and 24/7 travel concierge.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/rooms" className="btn-accent py-3.5 px-8 text-base">Book Your Stay Now</Link>
            <Link to="/contact" className="btn-outline py-3.5 px-8 text-base">Talk to Concierge</Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
