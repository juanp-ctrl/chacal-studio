'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const LOADER_IMAGES = [
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800', // Ecosfera Urbana
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', // Conexión Aula
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800', // Raíces del Futuro
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800', // Impacto Visual
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800', // Voces Nativas
  'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800', // Energía Limpia
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', // Patagonia mountains (future video)
];

const SESSION_KEY = 'chacal-intro-seen';
const LAST_IMAGE_INDEX = LOADER_IMAGES.length - 1;

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
  const t = useTranslations('IntroLoader');
  const initializedRef = useRef(false);
  const taglineCycleRef = useRef<NodeJS.Timeout | null>(null);
  
  const [showLoader, setShowLoader] = useState(false);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isExpanding, setIsExpanding] = useState(false);
  const [textExiting, setTextExiting] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [overlayDismissed, setOverlayDismissed] = useState(false);
  const [showHeroImage, setShowHeroImage] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  const taglines = [t('tagline1'), t('tagline2')];

  // Initialize visibility on mount (runs once)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    if (shouldShowIntro()) {
      requestAnimationFrame(() => {
        setShowLoader(true);
        document.body.style.overflow = 'hidden';
      });
    } else {
      // If intro was already seen, just show the hero image directly
      requestAnimationFrame(() => {
        setSkipAnimation(true);
        setShowHeroImage(true);
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

  // Tagline cycling - separate effect with explicit interval management
  useEffect(() => {
    if (!showLoader || visibleImages.length < 3 || textExiting) {
      if (taglineCycleRef.current) {
        clearInterval(taglineCycleRef.current);
        taglineCycleRef.current = null;
      }
      return;
    }

    // Start cycling taglines
    taglineCycleRef.current = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % 2);
    }, 1500);

    return () => {
      if (taglineCycleRef.current) {
        clearInterval(taglineCycleRef.current);
        taglineCycleRef.current = null;
      }
    };
  }, [showLoader, visibleImages.length, textExiting]);

  // Final expansion and exit sequence
  useEffect(() => {
    if (visibleImages.length !== LOADER_IMAGES.length) return;

    // Wait a moment after last image, then start expansion
    const expansionTimer = setTimeout(() => {
      setTextExiting(true);
      setIsExpanding(true);
      setShowHeroImage(true);
    }, 1200);

    // Dismiss the overlay (reveals hero image behind)
    const overlayTimer = setTimeout(() => {
      setOverlayDismissed(true);
    }, 2200);

    // Unlock scroll
    const completeTimer = setTimeout(() => {
      setShowLoader(false);
      sessionStorage.setItem(SESSION_KEY, 'true');
      document.body.style.overflow = '';
    }, 2700);

    return () => {
      clearTimeout(expansionTimer);
      clearTimeout(overlayTimer);
      clearTimeout(completeTimer);
    };
  }, [visibleImages.length]);

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      if (taglineCycleRef.current) {
        clearInterval(taglineCycleRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Hero Image - Full screen, stays visible after animation */}
      {showHeroImage && (
        <div
          className="fixed inset-0 w-full h-screen"
          style={{ zIndex: skipAnimation ? 0 : 9998 }}
        >
          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: skipAnimation ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={LOADER_IMAGES[LAST_IMAGE_INDEX]}
              alt="Chacal Studio - Comunicación desde la Patagonia"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Gradient overlay for better text readability on hero */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
          </motion.div>
        </div>
      )}

      {/* Loader Overlay */}
      <AnimatePresence>
        {showLoader && !overlayDismissed && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#2F2E59' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Top Text - "Comunicando lo humano" - BIGGER and HIGHER */}
            <motion.h1
              className="absolute text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif tracking-tight z-20 px-4 text-center"
              style={{
                fontFamily: 'var(--font-family-heading)',
                top: '10%',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: textExiting ? 0 : 1,
                y: 0,
                x: textExiting ? '-100vw' : 0,
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.2 },
                y: { duration: 0.8, delay: 0.2, ease: 'easeOut' },
                x: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
              }}
            >
              {t('headline')}
            </motion.h1>

            {/* Image Stack Container */}
            <div
              className="relative flex items-center justify-center"
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              {visibleImages.map((imageIndex) => {
                const scale = getScaleForImage(imageIndex, visibleImages.length);
                const isLastImage = imageIndex === LAST_IMAGE_INDEX;
                
                // When expanding, fade out all images (hero image takes over behind)
                if (isExpanding && isLastImage) {
                  return (
                    <motion.div
                      key={imageIndex}
                      className="absolute overflow-hidden shadow-2xl"
                      style={{
                        width: 'clamp(180px, 40vw, 300px)',
                        height: 'clamp(220px, 50vw, 380px)',
                        willChange: 'transform, opacity',
                        zIndex: imageIndex + 1,
                      }}
                      initial={{ opacity: 1, scale: scale, y: 0, borderRadius: 8 }}
                      animate={{
                        opacity: 0,
                        scale: 3,
                        borderRadius: 0,
                      }}
                      transition={{
                        opacity: { duration: 0.8, delay: 0.3 },
                        scale: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
                        borderRadius: { duration: 0.8 },
                      }}
                    >
                      <Image
                        src={LOADER_IMAGES[imageIndex]}
                        alt={`Chacal project ${imageIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 180px, 300px"
                        priority
                      />
                    </motion.div>
                  );
                }
                
                return (
                  <motion.div
                    key={imageIndex}
                    className="absolute rounded-lg overflow-hidden shadow-2xl"
                    style={{
                      width: 'clamp(180px, 40vw, 300px)',
                      height: 'clamp(220px, 50vw, 380px)',
                      willChange: 'transform',
                      zIndex: imageIndex + 1,
                    }}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{
                      opacity: isExpanding ? 0 : 1,
                      scale: scale,
                      y: 0,
                    }}
                    transition={{
                      opacity: { duration: 0.4, ease: 'easeOut' },
                      scale: { duration: 0.5, ease: 'easeOut' },
                      y: { duration: 0.5, ease: 'easeOut' },
                    }}
                  >
                    <Image
                      src={LOADER_IMAGES[imageIndex]}
                      alt={`Chacal project ${imageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 180px, 300px"
                      priority
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Text - Cycling taglines */}
            <motion.div
              className="absolute z-20"
              style={{ bottom: '18%' }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: textExiting ? 0 : visibleImages.length >= 3 ? 1 : 0,
                x: textExiting ? '100vw' : 0,
              }}
              transition={{
                opacity: { duration: 0.4 },
                x: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
              }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTaglineIndex}
                  className="text-white/80 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-center px-4"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  {taglines[currentTaglineIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

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
    </>
  );
}
