import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { hotelApi } from '../api/api';
import PageHero from '../components/layout/PageHero';
import ImageGallery from '../components/ui/ImageGallery';
import RoomCard from '../components/ui/RoomCard';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animate';
import { FEATURED_HOTELS, getHotelById, getRoomsByHotel } from '../data/mockData';

export default function HotelSingle() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(() => getHotelById(id));
  const rooms = getRoomsByHotel(id);

  useEffect(() => {
    hotelApi.getById(id)
      .then((data) => {
        if (data) {
          setHotel((prev) => ({
            ...prev,
            ...data,
            image: data.image || prev?.image,
            gallery: prev?.gallery || [data.image],
          }));
        }
      })
      .catch(() => {});
  }, [id]);

  if (!hotel) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center mesh-gradient">
        <h2 className="text-2xl font-semibold text-slate-800">Hotel not found</h2>
        <Link to="/hotels" className="btn-primary mt-6">Browse Hotels</Link>
      </div>
    );
  }

  const fallback = FEATURED_HOTELS.find((h) => h.id === Number(id)) || hotel;
  const displayHotel = { ...fallback, ...hotel };
  const gallery = displayHotel.gallery || [displayHotel.image];

  return (
    <>
      <PageHero
        title={displayHotel.name}
        subtitle={`${displayHotel.city}, ${displayHotel.country}`}
        image={displayHotel.image}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Hotels', to: '/hotels' },
          { label: displayHotel.name },
        ]}
      />

      <section className="relative -mt-12 pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <FadeIn>
                <ImageGallery images={gallery} alt={displayHotel.name} />
              </FadeIn>

              <FadeIn delay={0.2} className="mt-10">
                <div className="card-surface p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-slate-900">About this hotel</h2>
                      {displayHotel.star_rating && (
                        <p className="mt-2 text-accent-500">{'★'.repeat(displayHotel.star_rating)} Luxury</p>
                      )}
                    </div>
                    {displayHotel.priceFrom && (
                      <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 px-6 py-4 text-white shadow-lg shadow-primary-500/30">
                        <p className="text-xs text-primary-100">Starting from</p>
                        <p className="text-2xl font-bold">Rs {displayHotel.priceFrom.toLocaleString()}</p>
                        <p className="text-xs text-primary-200">per night</p>
                      </div>
                    )}
                  </div>
                  <p className="mt-6 leading-relaxed text-slate-600">{displayHotel.description}</p>
                  {displayHotel.address && (
                    <p className="mt-4 flex items-center gap-2 text-sm text-primary-700">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {displayHotel.address}
                    </p>
                  )}
                </div>
              </FadeIn>

              {displayHotel.highlights && (
                <FadeIn delay={0.3} className="mt-8">
                  <h3 className="font-display text-xl font-semibold text-slate-900">Highlights</h3>
                  <StaggerContainer className="mt-4 grid gap-3 sm:grid-cols-3">
                    {displayHotel.highlights.map((item) => (
                      <StaggerItem key={item}>
                        <div className="rounded-xl border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-4 text-sm text-slate-700">
                          <span className="text-accent-500">✦</span> {item}
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </FadeIn>
              )}
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky top-24 space-y-6"
              >
                <div className="gradient-border rounded-2xl p-6 bg-white">
                  <h3 className="font-semibold text-slate-900">Book your stay</h3>
                  <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
                    <input type="date" className="input-field" />
                    <input type="date" className="input-field" />
                    <select className="input-field">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3+ Guests</option>
                    </select>
                    <button type="submit" className="btn-primary w-full animate-pulse-glow">
                      Check Availability
                    </button>
                  </form>
                </div>

                {displayHotel.amenities && (
                  <div className="card-surface p-6">
                    <h3 className="font-semibold text-slate-900">Amenities</h3>
                    <ul className="mt-4 grid grid-cols-2 gap-3">
                      {displayHotel.amenities.map((a) => (
                        <li key={a} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs text-primary-700">✓</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {rooms.length > 0 && (
            <FadeIn className="mt-20">
              <h2 className="section-heading">Available Rooms</h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
                Choose from our selection of rooms at {displayHotel.name}
              </p>
              <div className="mt-12 space-y-8">
                {rooms.map((room, i) => (
                  <RoomCard key={room.id} room={room} index={i} />
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
