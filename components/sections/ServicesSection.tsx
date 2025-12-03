"use client";

import { motion } from "motion/react";
import { Compass, MessageCircle, Search, Settings, Leaf } from "lucide-react";
import { useTranslations } from "next-intl";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { AnimatedText } from "../atoms/AnimatedText";

export function ServicesSection() {
  const t = useTranslations("services");

  const services = [
    {
      icon: Compass,
      key: "consulting",
    },
    {
      icon: MessageCircle,
      key: "advisory",
    },
    {
      icon: Search,
      key: "diagnostic",
    },
    {
      icon: Settings,
      key: "management",
    },
  ];

  return (
    <section id="servicios" className="bg-secondary/30 px-6 py-24 sm:px-8 sm:py-32 lg:px-12 dark:bg-blue-dark border-t border-transparent dark:border-white/10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedText
            text={t("title")}
            as="h2"
            className="mb-6 text-3xl font-heading font-medium tracking-tight text-primary sm:text-4xl md:text-5xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className="group rounded-3xl border border-transparent bg-primary p-10 transition-all duration-300 hover:border-accent/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition-all duration-300 group-hover:bg-accent/10">
                <service.icon className="h-7 w-7 text-white transition-colors duration-300 group-hover:text-accent" strokeWidth={1.5} />
              </div>
              <Heading as="h3" className="mb-4 text-2xl font-bold text-white">
                {t(`${service.key}.title`)}
              </Heading>
              <Text className="font-light leading-relaxed text-white/70">
                {t(`${service.key}.description`)}
              </Text>
            </motion.div>
          ))}
        </div>

        {/* Sustainability Banner */}
        <motion.div
          className="rounded-3xl bg-linear-to-br from-primary via-primary to-accent/80 p-12 text-white md:p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col items-center gap-8 md:flex-row max-w-5xl">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <Leaf className="h-10 w-10 text-white" strokeWidth={1.5} />
            </div>
            <div className="text-center md:text-left">
              <Heading as="h3" className="mb-4 text-3xl font-bold text-white">
                {t("sustainability.title")}
              </Heading>
              <Text className="text-lg font-light leading-relaxed text-white/90">
                {t("sustainability.description")}
              </Text>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
