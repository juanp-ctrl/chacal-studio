"use client";

import { useTranslations } from 'next-intl';
import * as motion from "motion/react-client"
import { useRef } from 'react';
import { useInView } from 'motion/react';

export function FutureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations('future');

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-brand-blue text-white overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-white mb-6 tracking-tight capitalize font-serif text-3xl sm:text-4xl">
              {t('title')}
            </h2>
            <div className="space-y-4 text-white/90 text-lg font-light leading-relaxed">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
              <p>{t('p4')}</p>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Using a standard img tag here as Next.js Image might require domain config for unsplash */}
            <img
              src="https://images.unsplash.com/photo-1688501935726-d231682e79d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHBsYW5ldCUyMG5hdHVyZXxlbnwxfHx8fDE3NjMzMTgwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Earth and nature"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

