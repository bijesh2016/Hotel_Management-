import PageHero from '../components/layout/PageHero';
import RoomCard from '../components/ui/RoomCard';
import { FadeIn } from '../components/ui/Animate';
import { ROOMS } from '../data/mockData';

export default function Rooms() {
  return (
    <>
      <PageHero
        title="Rooms in Nepal"
        subtitle="Luxury accommodations with breathtaking views"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Rooms' }]}
      />

      <section className="mesh-gradient py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FadeIn>
            <p className="mx-auto max-w-2xl text-center text-slate-600">
              Each room is thoughtfully designed to blend modern comfort with Nepali hospitality.
            </p>
          </FadeIn>
          <div className="mt-14 space-y-10">
            {ROOMS.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
