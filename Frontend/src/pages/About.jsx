import PageHero from '../components/layout/PageHero';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animate';
import { IMAGES, SERVICES } from '../data/mockData';

export default function About() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Crafting unforgettable stays across Nepal since day one"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      <section className="mesh-gradient py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn direction="left">
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl">
                <div
                  className="h-96 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${IMAGES.about})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <h2 className="font-display text-3xl font-semibold text-slate-900">
                Welcome to <span className="gradient-text">Nepal Hotels</span>
              </h2>
              <p className="mt-6 leading-relaxed text-slate-600">
                We are Nepal&apos;s premier hotel reservation platform, connecting travelers with exceptional accommodations across the country.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Our platform integrates real-time booking, secure payments, and dedicated support — powered by a modern backend built for scale.
              </p>
              <StaggerContainer className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { value: '50+', label: 'Hotels' },
                  { value: '200+', label: 'Rooms' },
                  { value: '10k+', label: 'Guests' },
                ].map((stat) => (
                  <StaggerItem key={stat.label}>
                    <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-white p-5 text-center shadow-sm border border-primary-100">
                      <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                      <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FadeIn>
            <h2 className="section-heading">Our <span className="gradient-text">Commitment</span></h2>
          </FadeIn>
          <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(0, 4).map((s) => (
              <StaggerItem key={s.title}>
                <div className="card-surface group p-6 text-center transition hover:shadow-2xl hover:shadow-primary-100/50">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 text-3xl transition group-hover:scale-110">
                    {s.icon}
                  </span>
                  <h3 className="mt-4 font-semibold text-slate-800">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{s.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
