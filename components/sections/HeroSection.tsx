"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";

export function HeroSection() {
  const scrollToNext = () => {
    const element = document.getElementById("method");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--brand-blue)]"
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Heading
            as="h1"
            className="mb-12 text-4xl font-normal tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Comunicando lo humano
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Text
            className="mx-auto mb-16 max-w-3xl text-base font-light leading-relaxed text-white/90 sm:text-lg md:text-xl"
            as="p"
          >
            Creamos estrategias de comunicación con propósito desde la Patagonia.
            Somos un estudio de comunicación y diseño que transforma marcas en
            agentes de cambio, respetando a todos los seres sintientes y el
            planeta.
          </Text>
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
            Descubrí nuestra propuesta
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

