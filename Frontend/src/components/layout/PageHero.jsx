import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IMAGES } from '../../data/mockData';

export default function PageHero({ title, breadcrumbs = [], image = IMAGES.hero, subtitle }) {
  return (
    <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/70 to-primary-900/90" />
      <div className="absolute inset-0 mesh-gradient opacity-60" />

      <div className="relative z-10 px-4 text-center text-white">
        {breadcrumbs.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-sm text-primary-200"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label}>
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-white transition">{crumb.label}</Link>
                ) : (
                  <span className="text-white/90">{crumb.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span className="mx-2 text-primary-400">›</span>}
              </span>
            ))}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-4xl font-bold md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-4 max-w-xl text-primary-100"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
