"use client";

import { motion } from "motion/react";
import { Users, Heart, Globe } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatedText } from "@/components/atoms/AnimatedText";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";

// Using the same Unsplash images from the reference implementation
const impactImages = [
  'https://images.unsplash.com/photo-1752650735943-d0fbf1edce21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjMyOTI3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1761250027507-c0be614c0254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjBoZWxwaW5nfGVufDF8fHx8MTc2MzIyMzc5MXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1647901493574-204e18ae897f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudHMlMjBncmVlbiUyMGVudmlyb25tZW50fGVufDF8fHx8MTc2MzMxODA5OHww&ixlib=rb-4.1.0&q=80&w=1080',
];

export function ImpactSection() {
  const t = useTranslations("impact");

  const impacts = [
    {
      icon: Users,
      key: "team",
      image: impactImages[0],
    },
    {
      icon: Heart,
      key: "community",
      image: impactImages[1],
    },
    {
      icon: Globe,
      key: "planet",
      image: impactImages[2],
    },
  ];

  return (
    <section id="impacto" className="bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12 dark:bg-zinc-900 border-t border-gray-100 dark:border-white/10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <AnimatedText
            as="h2"
            className="mb-6 text-3xl font-heading font-medium tracking-tight text-primary sm:text-4xl md:text-5xl"
            text={t("title")}
          />
          <Text className="text-lg text-muted-foreground max-w-2xl">
            {t("subtitle")}
          </Text>
        </motion.div>

        <div className="space-y-32">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.key}
              className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="mb-6 flex items-center">
                  <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 dark:bg-accent/20 text-accent">
                    <impact.icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <Heading as="h3" className="text-3xl font-bold text-primary dark:text-white">
                    {t(`${impact.key}.title`)}
                  </Heading>
                </div>
                <Text className="text-lg leading-relaxed text-muted-foreground">
                  {t(`${impact.key}.description`)}
                </Text>
              </div>

              <div className={cn("relative h-[400px] sm:h-[500px] overflow-hidden rounded-3xl bg-gray-100", index % 2 === 1 ? "lg:order-1" : "")}>
                <Image
                  src={impact.image}
                  alt={t(`${impact.key}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
