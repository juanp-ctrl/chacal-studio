'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const LOADER_IMAGES = [
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800', // Ecosfera Urbana
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', // Conexión Aula
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800', // Raíces del Futuro
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800', // Impacto Visual
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800', // Voces Nativas
  'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800', // Energía Limpia
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', // Patagonia mountains
];


const SESSION_KEY = 'chacal-intro-seen';

// Scale values: frontmost image stays at 1.0, images behind scale up progressively
const getScaleForImage = (imageIndex: number, currentImageCount: number): number => {
  if (currentImageCount <= 1) return 1;
  const distanceFromFront = currentImageCount - 1 - imageIndex;
  return 1 + distanceFromFront * 0.1;
};

// Check session storage - only runs on client
const shouldShowIntro = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !sessionStorage.getItem(SESSION_KEY);
};

export function IntroLoader() {
  const initializedRef = useRef(false);
  
  const [showLoader, setShowLoader] = useState(false);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [isExpanding, setIsExpanding] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Initialize visibility on mount (runs once)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    if (shouldShowIntro()) {
      requestAnimationFrame(() => {
        setShowLoader(true);
        document.body.style.overflow = 'hidden';
      });
    }
  }, []);

  // Preload images
  useEffect(() => {
    if (!showLoader) return;
    
    LOADER_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.onload = () => setImagesLoaded((prev) => prev + 1);
      img.src = src;
    });
  }, [showLoader]);

  // Image stacking animation sequence
  useEffect(() => {
    if (!showLoader || imagesLoaded < LOADER_IMAGES.length) return;

    const imageTimers: NodeJS.Timeout[] = [];
    
    LOADER_IMAGES.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleImages((prev) => [...prev, index]);
      }, 300 + index * 450);
      imageTimers.push(timer);
    });

    return () => imageTimers.forEach(clearTimeout);
  }, [showLoader, imagesLoaded]);

  // Final expansion and exit sequence
  useEffect(() => {
    if (visibleImages.length !== LOADER_IMAGES.length) return;

    // Wait a moment after last image, then start expansion
    const expansionTimer = setTimeout(() => {
      setIsExpanding(true);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('intro-exit-start'));
      }
    }, 1100);

    // Fade out loader completely
    const exitTimer = setTimeout(() => {
      setShowLoader(false);
      sessionStorage.setItem(SESSION_KEY, 'true');
      document.body.style.overflow = '';
    }, 2700);

    return () => {
      clearTimeout(expansionTimer);
      clearTimeout(exitTimer);
    };
  }, [visibleImages.length]);

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Don't render if loader not active
  if (!showLoader) {
    return null;
  }

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#2F2E59' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Image Stack Container */}
          <div className="relative flex items-center justify-center w-full h-full">
            {visibleImages.map((imageIndex) => {
              const scale = getScaleForImage(imageIndex, visibleImages.length);
              const isLastImage = imageIndex === LOADER_IMAGES.length - 1;
              
              return (
                <motion.div
                  key={imageIndex}
                  className="absolute rounded-sm overflow-hidden shadow-2xl"
                  style={{
                    // Square 500x500 on desktop, smaller on mobile
                    width: 'clamp(500px, 35vw, 500px)',
                    height: 'clamp(500px, 35vw, 500px)',
                    willChange: 'transform',
                    zIndex: imageIndex + 1,
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{
                    opacity: isExpanding ? (isLastImage ? 1 : 0) : 1,
                    scale: isExpanding ? (isLastImage ? 1.9 : 1) : scale,
                    y: 0,
                  }}
                  transition={{
                    opacity: { duration: isExpanding ? 0.3 : 0.4, ease: 'easeOut' },
                    scale: {
                      duration: isExpanding ? 1.5 : 0.5,
                      ease: isExpanding ? [0.25, 0.1, 0.25, 1] : 'easeOut',
                    },
                    y: { duration: 0.5, ease: 'easeOut' },
                  }}
                >
                  <Image
                    src={LOADER_IMAGES[imageIndex]}
                    alt={`Chacal project ${imageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 300px"
                    priority
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Loading indicator while images preload */}
          {imagesLoaded < LOADER_IMAGES.length && (
            <motion.div
              className="absolute bottom-10 flex gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 bg-white/60 rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
