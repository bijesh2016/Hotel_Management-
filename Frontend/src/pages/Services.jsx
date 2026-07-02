import PageHero from '../components/layout/PageHero';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animate';
import { SERVICES } from '../data/mockData';

export default function Services() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Premium amenities for every guest"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      <section className="mesh-gradient py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FadeIn>
            <p className="mx-auto max-w-2xl text-center text-slate-600">
              Everything you need for a comfortable and memorable stay, available across our partner properties.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <StaggerItem key={service.title}>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-100/40">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary-100 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 text-2xl text-white shadow-lg shadow-primary-500/30 transition group-hover:scale-110">
                    {service.icon}
                  </div>
                  <h3 className="relative mt-5 font-display text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="relative mt-2 text-sm text-slate-500 leading-relaxed">{service.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
