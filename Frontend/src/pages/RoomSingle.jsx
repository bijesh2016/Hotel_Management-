import { Link, useParams, useNavigate } from 'react-router-dom';
// import { motion, useState } from 'framer-motion';
import PageHero from '../components/layout/PageHero';
import ImageGallery from '../components/ui/ImageGallery';
import StarRating from '../components/ui/StarRating';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animate';
import { getHotelById, getRoomById } from '../data/mockData';
import { bookingApi } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function RoomSingle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const room = getRoomById(id);
  const hotel = room ? getHotelById(room.hotelId) : null;
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!room) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center mesh-gradient">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-semibold text-slate-800"
        >
          Room not found
        </motion.h2>
        <Link to="/rooms" className="btn-primary mt-6">Back to Rooms</Link>
      </div>
    );
  }

  const gallery = room.gallery || [room.image];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/rooms/${id}` } });
      return;
    }

    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }

    setLoading(true);
    try {
      // Backend calculates price - don't send total_amount
      await bookingApi.create({
        room_id: id,
        check_in: checkIn,
        check_out: checkOut,
        guests,
      });
      navigate('/bookings');
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        title={room.name}
        subtitle={hotel ? `at ${hotel.name}` : undefined}
        image={room.image}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Rooms', to: '/rooms' },
          { label: room.name },
        ]}
      />

      <section className="relative -mt-12 pb-20 mesh-gradient">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <FadeIn>
                <ImageGallery images={gallery} alt={room.name} />
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="card-surface p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <StarRating rating={room.rating} />
                    <div className="rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 px-6 py-3 text-white shadow-lg">
                      <span className="text-2xl font-bold">Rs {room.price.toLocaleString()}</span>
                      <span className="ml-1 text-sm text-white/80">/ night</span>
                    </div>
                  </div>

                  <h2 className="mt-6 font-display text-3xl font-semibold text-slate-900">{room.name}</h2>
                  {hotel && (
                    <Link
                      to={`/hotels/${hotel.id}`}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {hotel.name} — {hotel.city}
                    </Link>
                  )}
                  <p className="mt-6 leading-relaxed text-slate-600">{room.description}</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.25}>
                <h3 className="font-display text-xl font-semibold text-slate-900">Room Features</h3>
                <StaggerContainer className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { label: 'Guests', value: room.maxGuests, icon: '👥' },
                    { label: 'Size', value: room.size, icon: '📐' },
                    { label: 'View', value: room.view, icon: '🏔️' },
                    { label: 'Bed', value: room.bed, icon: '🛏️' },
                  ].map((item) => (
                    <StaggerItem key={item.label}>
                      <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-white to-primary-50/50 p-5 text-center transition hover:shadow-lg hover:shadow-primary-100/50">
                        <span className="text-2xl">{item.icon}</span>
                        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">{item.label}</p>
                        <p className="mt-1 font-semibold text-slate-800">{item.value}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </FadeIn>

              {room.amenities && (
                <FadeIn delay={0.35}>
                  <h3 className="font-display text-xl font-semibold text-slate-900">Amenities</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {room.amenities.map((a) => (
                      <span
                        key={a}
                        className="rounded-full border border-primary-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:border-primary-400 hover:bg-primary-50"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </FadeIn>
              )}
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="sticky top-24"
              >
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 p-8 text-white shadow-2xl shadow-primary-900/30">
                  <div className="absolute inset-0 mesh-gradient opacity-30" />
                  <div className="relative">
                    <h3 className="font-display text-xl font-semibold">Reserve this room</h3>
                    <p className="mt-2 text-sm text-primary-200">Best price guarantee · Free cancellation</p>

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                      {error && (
                        <div className="rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-200">{error}</div>
                      )}
                      <div>
                        <label className="text-xs text-primary-200">Check-in</label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="input-field mt-1 !border-primary-600/30 !bg-white/10 !text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-primary-200">Check-out</label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="input-field mt-1 !border-primary-600/30 !bg-white/10 !text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-primary-200">Guests</label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                          className="input-field mt-1 !border-primary-600/30 !bg-white/10 !text-white"
                        >
                          {Array.from({ length: room.maxGuests }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>

                      <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                        <div className="flex justify-between text-sm">
                          <span className="text-primary-200">Rs {room.price.toLocaleString()} × 1 night</span>
                          <span className="font-semibold">Rs {room.price.toLocaleString()}</span>
                        </div>
                        <div className="mt-2 flex justify-between border-t border-white/10 pt-2">
                          <span className="font-medium">Total</span>
                          <span className="text-lg font-bold text-accent-400">Rs {room.price.toLocaleString()}</span>
                        </div>
                      </div>

                      <button type="submit" disabled={loading} className="btn-accent w-full !shadow-accent-500/30 disabled:opacity-60">
                        {loading ? 'Processing...' : 'Book Now'}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
