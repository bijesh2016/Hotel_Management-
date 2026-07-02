import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageGallery({ images, alt = 'Gallery' }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="group relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="aspect-[16/10] bg-cover bg-center"
            style={{ backgroundImage: `url(${images[active]})` }}
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => setActive(i)}
            className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
              active === i
                ? 'ring-2 ring-primary-500 ring-offset-2 scale-105'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
