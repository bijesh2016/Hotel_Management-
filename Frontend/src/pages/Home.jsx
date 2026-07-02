import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { hotelApi } from '../api/api';
import HotelCard from '../components/ui/HotelCard';
import RoomCard from '../components/ui/RoomCard';
import { HeroText, FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animate';
import { FEATURED_HOTELS, IMAGES, ROOMS, SERVICES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAdmin, isHotelOwner } = useAuth();
  const [hotels, setHotels] = useState(FEATURED_HOTELS);

  useEffect(() => {
    hotelApi.getAll()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHotels(data.map((h, i) => ({
            ...FEATURED_HOTELS[i % FEATURED_HOTELS.length],
            ...h,
            image: h.image || FEATURED_HOTELS[i % FEATURED_HOTELS.length]?.image,
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/70 to-primary-800/40" />
        <div className="absolute inset-0 mesh-gradient opacity-40" />

        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl animate-float" />
        <div className="absolute -left-10 bottom-20 h-56 w-56 rounded-full bg-accent-500/15 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
          <HeroText>
            <p className="inline-block rounded-full border border-accent-400/30 bg-accent-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400 backdrop-blur-sm">
              Welcome to Nepal Hotels
            </p>
          </HeroText>
          <HeroText delay={0.15}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Book your stay in the{' '}
              <span className="bg-gradient-to-r from-primary-300 via-accent-300 to-primary-200 bg-clip-text text-transparent">
                heart of Nepal
              </span>
            </h1>
          </HeroText>
          <HeroText delay={0.3}>
            <p className="mt-6 max-w-xl text-lg text-primary-100/90">
              Luxury accommodations from the Himalayas to the Terai. Experience world-class hospitality with authentic Nepali warmth.
            </p>
          </HeroText>
          <HeroText delay={0.45}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/hotels" className="btn-primary">Explore Hotels</Link>
              <Link to="/rooms" className="btn-outline">View Rooms</Link>
              {(isAdmin || isHotelOwner) && (
                <Link to="/admin" className="btn-accent">Admin Panel</Link>
              )}
            </div>
          </HeroText>

          <HeroText delay={0.6}>
            <div className="mt-16 flex flex-wrap gap-8 border-t border-white/10 pt-10">
              {[
                { value: '50+', label: 'Hotels' },
                { value: '200+', label: 'Rooms' },
                { value: '4.9', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-primary-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </HeroText>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      <section className="mesh-gradient py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FadeIn>
            <h2 className="section-heading">
              Featured <span className="gradient-text">Hotels</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
              Handpicked properties across Nepal&apos;s most sought-after destinations.
            </p>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {hotels.slice(0, 3).map((hotel, i) => (
              <HotelCard key={hotel.id || i} hotel={hotel} index={i} />
            ))}
          </div>
          <FadeIn className="mt-10 text-center">
            <Link to="/hotels" className="btn-ghost">View All Hotels →</Link>
          </FadeIn>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FadeIn>
            <h2 className="section-heading">
              Featured <span className="gradient-text">Rooms</span>
            </h2>
          </FadeIn>
          <div className="mt-14 space-y-10">
            {ROOMS.slice(0, 2).map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
          <FadeIn className="mt-10 text-center">
            <Link to="/rooms" className="btn-ghost">See All Rooms →</Link>
          </FadeIn>
        </div>
      </section>

      <section className="mesh-gradient py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <FadeIn direction="left">
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl">
                <div
                  className="h-96 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${IMAGES.about})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
              </div>
              <h2 className="mt-8 font-display text-3xl font-semibold text-slate-900">
                The most recommended vacation rental
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                From heritage palaces in Kathmandu to serene lakeside resorts in Pokhara, Nepal Hotels connects you with exceptional stays.
              </p>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <h2 className="font-display text-3xl font-semibold text-slate-900">
                What we <span className="gradient-text">offer</span>
              </h2>
              <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2">
                {SERVICES.slice(0, 8).map((service) => (
                  <StaggerItem key={service.title}>
                    <div className="group flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/50">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 text-xl transition group-hover:scale-110">
                        {service.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm">{service.title}</h3>
                        <p className="mt-1 text-xs text-slate-500">{service.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-primary-900/90" />
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-primary-600/10 via-accent-500/10 to-primary-600/10" />

        <FadeIn className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Ready to get started?</h2>
          <p className="mt-6 text-lg text-primary-100">
            Book your dream stay in a few clicks. Safe, secure, and backed by 24/7 support.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/hotels" className="btn-primary">Book Now</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
