"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

export function PartnersSection() {
  const t = useTranslations("partners");

  const partners = [
    {
      key: "animalSave",
      url: "https://thesavemovement.org/",
    },
    {
      key: "cleanCreatives",
      url: "https://cleancreatives.org/",
    },
    {
      key: "ati",
      url: "https://ati.lat/",
    },
    {
      key: "redCreer",
      url: "https://redcreer.org/",
    },
  ];

  return (
    <section id="alianzas" className="py-24 sm:py-32 px-6 lg:px-8 bg-white dark:bg-blue-dark border-t border-transparent dark:border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            as="h2"
            className="mb-6 text-3xl font-medium tracking-tight text-primary sm:text-4xl md:text-5xl"
          >
            {t("title")}
          </Heading>
          <Text className="text-muted-foreground dark:text-white/80 text-lg sm:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            {t("subtitle")}
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.key}
              className="group relative overflow-hidden rounded-2xl bg-primary p-8 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-accent/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <Heading as="h3" className="text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                  {t(`${partner.key}.name`)}
                </Heading>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-accent transition-colors duration-300 p-2 -mr-2 -mt-2 rounded-full hover:bg-white/10"
                  aria-label={`Visitar sitio de ${t(`${partner.key}.name`)}`}
                >
                  <ExternalLink size={20} />
                </a>
              </div>
              
              <Text className="text-white/80 leading-relaxed mb-6 font-light">
                {t(`${partner.key}.description`)}
              </Text>

              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors duration-300 group/link"
              >
                {t("learnMore")}
                <ExternalLink size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
