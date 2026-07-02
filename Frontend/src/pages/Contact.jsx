import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/layout/PageHero';
import { FadeIn } from '../components/ui/Animate';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="mesh-gradient py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="font-display text-3xl font-semibold text-slate-900">
                Get in <span className="gradient-text">touch</span>
              </h2>
              <p className="mt-4 text-slate-600">
                Have questions about a booking or need help planning your trip? We&apos;re here 24/7.
              </p>
              <div className="mt-10 space-y-5">
                {[
                  { label: 'Address', value: 'Thamel, Kathmandu, Nepal', icon: '📍' },
                  { label: 'Phone', value: '+977 1 234 567', icon: '📞' },
                  { label: 'Email', value: 'info@nepalhotels.com', icon: '✉️' },
                  { label: 'Hours', value: 'Mon – Sun, 24/7 Support', icon: '🕐' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-lg hover:border-primary-200"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 text-xl">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{item.label}</p>
                      <p className="font-medium text-slate-800">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div className="card-surface overflow-hidden p-8">
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-3xl text-white shadow-lg">
                      ✓
                    </div>
                    <h3 className="mt-6 font-display text-xl font-semibold text-slate-800">Message sent!</h3>
                    <p className="mt-2 text-sm text-slate-500">We&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                    <h3 className="font-display text-xl font-semibold text-slate-900">Send a message</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input type="text" placeholder="First name" className="input-field" required />
                      <input type="text" placeholder="Last name" className="input-field" required />
                    </div>
                    <input type="email" placeholder="Email address" className="input-field" required />
                    <input type="text" placeholder="Subject" className="input-field" required />
                    <textarea placeholder="Your message" rows={5} className="input-field resize-none" required />
                    <button type="submit" className="btn-primary w-full">Send Message</button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
