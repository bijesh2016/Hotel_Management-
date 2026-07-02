import { useEffect, useState } from 'react';
import { hotelApi } from '../api/api';
import PageHero from '../components/layout/PageHero';
import HotelCard from '../components/ui/HotelCard';
import { FadeIn } from '../components/ui/Animate';
import { FEATURED_HOTELS } from '../data/mockData';

export default function Hotels() {
  const [hotels, setHotels] = useState(FEATURED_HOTELS);
  const [loading, setLoading] = useState(true);

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
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero
        title="Our Hotels"
        subtitle="Discover handpicked luxury stays across Nepal"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Hotels' }]}
      />

      <section className="mesh-gradient py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FadeIn>
            <p className="mx-auto max-w-2xl text-center text-slate-600">
              From heritage palaces to jungle eco-lodges — find your perfect retreat.
            </p>
          </FadeIn>

          {loading ? (
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : (
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {hotels.map((hotel, i) => (
                <HotelCard key={hotel.id || i} hotel={hotel} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
