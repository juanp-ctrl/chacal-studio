"use client";

import { useTranslations } from 'next-intl';
import * as motion from "motion/react-client"

export function MarqueeSection() {
  const t = useTranslations('marquee');

  // Duplicamos el texto múltiples veces para crear el efecto de loop continuo
  const marqueeText = t('text');
  const repeatedText = Array(4).fill(marqueeText).join('   ');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent/80 py-12 sm:py-16">
      <div className="relative">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -1000], // Ajuste dinámico sería ideal, pero un valor fijo grande funciona con suficiente repetición
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {/* Renderizamos el bloque de texto repetido varias veces para asegurar que cubra pantallas grandes */}
          {[...Array(2)].map((_, i) => (
            <span key={i} className="text-white text-2xl md:text-3xl pr-8 font-serif italic tracking-wide">
              {repeatedText}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

