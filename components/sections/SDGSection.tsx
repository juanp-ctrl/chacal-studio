"use client";

import { motion } from "motion/react";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

const sdgColors = ['#EF402D', '#A31C44', '#F99D26', '#CF8D2A', '#48773E'];

export function SDGSection() {
  const sdgs = [
    {
      number: 5,
      title: "Igualdad de Género",
      description: "Trabajamos activamente para asegurar la igualdad de oportunidades y el empoderamiento de todas las mujeres y niñas a través de nuestras políticas internas y narrativa.",
      color: sdgColors[0],
    },
    {
      number: 8,
      title: "Trabajo Decente y Crecimiento Económico",
      description: "Promovemos un crecimiento económico inclusivo y sostenible, garantizando condiciones de trabajo justas, creativas y dignas para todo nuestro equipo.",
      color: sdgColors[1],
    },
    {
      number: 11,
      title: "Ciudades y Comunidades Sostenibles",
      description: "Contribuimos a la creación de comunidades más inclusivas y sostenibles, apoyando iniciativas locales que mejoran la calidad de vida urbana y rural.",
      color: sdgColors[2],
    },
    {
      number: 12,
      title: "Producción y Consumo Responsables",
      description: "Adoptamos prácticas de consumo consciente y promovemos la producción responsable, minimizando residuos y optimizando recursos en cada proyecto.",
      color: sdgColors[3],
    },
    {
      number: 13,
      title: "Acción por el Clima",
      description: "Tomamos medidas urgentes para combatir el cambio climático, integrando la sostenibilidad ambiental en el corazón de nuestra estrategia de negocio y comunicación.",
      color: sdgColors[4],
    },
  ];

  return (
    <section id="ods" className="py-24 sm:py-32 px-6 lg:px-8 bg-blue-darker text-white border-t border-white/10">
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
            className="mb-6 text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Objetivos de Desarrollo Sostenible
          </Heading>
          <Text className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Nuestro compromiso con un futuro mejor se refleja en nuestra alineación con los ODS de las Naciones Unidas.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sdgs.map((sdg, index) => (
            <motion.div
              key={sdg.number}
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="h-32 flex items-center justify-center text-white relative overflow-hidden"
                style={{ backgroundColor: sdg.color }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                <div className="relative z-10 text-center">
                  <span className="block text-6xl font-bold opacity-90 mb-1">{sdg.number}</span>
                  <span className="block text-xs uppercase tracking-widest font-medium opacity-90">ODS</span>
                </div>
              </div>
              <div className="p-8">
                <Heading as="h3" className="text-white mb-4 text-xl font-bold leading-tight min-h-[3.5rem] flex items-center">
                  {sdg.title}
                </Heading>
                <Text className="text-white/70 leading-relaxed font-light text-sm">
                  {sdg.description}
                </Text>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

