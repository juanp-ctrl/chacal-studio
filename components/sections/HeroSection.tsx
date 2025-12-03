"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { AnimatedText } from "@/components/atoms/AnimatedText";
import { Button } from "@/components/atoms/Button";

export function HeroSection() {
  const t = useTranslations("hero");

  const scrollToNext = () => {
    const element = document.getElementById("method");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden bg-(--brand-blue)"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 py-32 text-center sm:px-8 sm:py-44 lg:px-12">
        <AnimatedText
          text={t("title")}
          as="h1"
          className="mb-12 text-4xl font-normal tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          delay={0.3}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <AnimatedText
            text={t("subtitle")}
            as="p"
            className="mx-auto mb-16 max-w-3xl text-base font-light leading-relaxed text-white/90 sm:text-lg md:text-xl"
            delay={0.5}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <Button
            variant="accent"
            size="lg"
            className="rounded-full px-8 py-6 text-base font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            onClick={scrollToNext}
          >
            {t("cta")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
