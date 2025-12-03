'use client';

import Image from 'next/image';
import { motion, Transition } from 'motion/react';
import { useEffect, useState } from 'react';

// This will be replaced with a video in the future
const HERO_MEDIA_URL = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920';

export function VideoHeroSection() {
  const [shouldAnimateEntry, setShouldAnimateEntry] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(true);

  useEffect(() => {
    // Check if intro was seen
    const seen = sessionStorage.getItem('chacal-intro-seen');
    if (!seen) {
      // Avoid synchronous state update warning
      setTimeout(() => setHasSeenIntro(false), 0);
      
      // Listen for event
      const handleIntroExit = () => setShouldAnimateEntry(true);
      window.addEventListener('intro-exit-start', handleIntroExit);
      return () => window.removeEventListener('intro-exit-start', handleIntroExit);
    }
  }, []);

  // Define animation states
  // If intro NOT seen yet (hasSeenIntro = false), start small and invisible
  // If intro SEEN (hasSeenIntro = true), use standard fade in
  const initial = !hasSeenIntro 
    ? { opacity: 0, scale: 0.3 } 
    : { opacity: 0, scale: 1.1 };

  // If intro NOT seen: wait for shouldAnimateEntry, then go to full
  // If intro SEEN: go to full immediately (standard animation)
  const target = !hasSeenIntro
    ? (shouldAnimateEntry ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 })
    : { opacity: 1, scale: 1 };

  const transition: Transition = !hasSeenIntro
    ? { delay: 0.5, duration: 2, ease: [0.25, 0.1, 0.25, 1] } // Matches loader exit feel
    : { duration: 1.2, ease: 'easeOut' };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image/Video */}
      <motion.div
        className="absolute inset-0"
        initial={initial}
        animate={target}
        transition={transition}
      >
        <Image
          src={HERO_MEDIA_URL}
          alt="Patagonia landscape - Chacal Studio"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        
        {/* Gradient overlays for depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2F2E59]/30 via-transparent to-[#2F2E59]/30" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: !hasSeenIntro ? 1.5 : 1, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-white/80 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}