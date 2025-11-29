"use client";

import { motion } from "motion/react";
import { ExternalLink, Leaf, Globe2, Sprout } from "lucide-react";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

const principles = [
  {
    title: "Renunciar",
    description: "Detener la expansión de la agricultura animal y la deforestación.",
    icon: Sprout,
  },
  {
    title: "Redirigir",
    description: "Promover una transición activa hacia sistemas alimentarios basados en plantas.",
    icon: Globe2,
  },
  {
    title: "Restaurar",
    description: "Sanar ecosistemas clave y reforestar la Tierra.",
    icon: Leaf,
  },
];

const actions = [
  {
    title: "Firmar como Individuo",
    url: "https://plantbasedtreaty.org/sign-as-an-individual",
  },
  {
    title: "Firmar como Organización",
    url: "https://plantbasedtreaty.org/sign-as-an-organization",
  },
  {
    title: "Firmar como Negocio",
    url: "https://plantbasedtreaty.org/sign-as-a-business",
  },
];

export function PlantBasedTreatySection() {
  return (
    <section 
      id="plant-based-treaty" 
      className="relative py-24 sm:py-32 px-6 lg:px-8 overflow-hidden bg-blue-darker border-t border-white/10"
    >
      {/* Subtle decorative patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl bg-pbt-green" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl bg-pbt-green-light" />
      </div>

      {/* Subtle leaf pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c-5 0-10 5-10 15 0 10 10 15 10 15s10-5 10-15c0-10-5-15-10-15z' fill='%2352B788' fill-opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Plant Based Treaty visual cue */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pbt-green">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/70 uppercase tracking-wider text-sm font-medium">Alianza Estratégica</span>
          </div>
          
          <Heading as="h2" className="mb-6 text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl capitalize">
            Tratado Basado en Plantas
          </Heading>
          <Text className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Como primera agencia de diseño en firmar el Tratado Basado en Plantas, nos comprometemos a promover un sistema alimentario que respete nuestro planeta.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Mission & Principles */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heading as="h3" className="text-white mb-6 text-2xl font-bold">Nuestra Misión</Heading>
            <Text className="text-white/70 mb-4 leading-relaxed font-light">
              Abogar por un cambio sistémico hacia dietas basadas en plantas para combatir la crisis climática, promoviendo la transición lejos de la agricultura animal.
            </Text>
            <Text className="text-white/70 mb-8 leading-relaxed font-light">
              Creemos que la comunicación visual es una herramienta poderosa para acelerar este cambio necesario.
            </Text>
            
            {/* 3Rs Principles */}
            <div className="space-y-4">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  className="relative group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex gap-4 p-5 rounded-xl backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:border-pbt-green/40 bg-white/[0.03]">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 bg-pbt-green/15 text-pbt-green-light">
                      <principle.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">{principle.title}</p>
                      <p className="text-white/60 text-sm leading-relaxed font-light">{principle.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Impact Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Contribution Card */}
            <div className="p-8 rounded-2xl backdrop-blur-sm border-2 border-pbt-green/20 bg-pbt-green/[0.08] transition-all duration-500 hover:scale-[1.02]">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-pbt-green">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <Heading as="h3" className="text-white text-xl font-bold">Nuestra Contribución</Heading>
              </div>
              <Text className="text-white/70 leading-relaxed font-light">
                Diseñamos campañas de impacto para elevar la conciencia sobre la crisis climática y la alimentación, utilizando nuestra experiencia creativa para amplificar el mensaje.
              </Text>
            </div>

            {/* Impact Card */}
            <div className="p-8 rounded-2xl backdrop-blur-sm border border-white/10 bg-white/[0.03] transition-all duration-500 hover:scale-[1.02]">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-blue-base">
                  <Globe2 className="w-6 h-6 text-white" />
                </div>
                <Heading as="h3" className="text-white text-xl font-bold">Impacto Global</Heading>
              </div>
              <Text className="text-white/70 leading-relaxed font-light">
                Nos unimos a ciudades, organizaciones e individuos para presionar por un cambio global en las políticas alimentarias y climáticas.
              </Text>
            </div>

            {/* Decorative element */}
            <div className="relative h-32 rounded-2xl overflow-hidden opacity-20 hidden lg:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-24 h-24 text-pbt-green" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Actions */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center">
            <Heading as="h3" className="text-white mb-10 text-3xl font-medium">Únete al Movimiento</Heading>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {actions.map((action, index) => (
                <motion.a
                  key={action.title}
                  href={action.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 border-2 bg-white/5 border-white/15 text-white hover:bg-pbt-green/15 hover:border-pbt-green"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {action.title}
                  <ExternalLink size={16} />
                </motion.a>
              ))}
            </div>

            {/* Donate CTA - Highlighted */}
            <div className="max-w-2xl mx-auto rounded-3xl shadow-2xl p-10 backdrop-blur-sm border-2 border-pbt-green/30 transition-all duration-500 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, rgba(82, 183, 136, 0.2) 0%, rgba(116, 198, 157, 0.15) 100%)',
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-pbt-green">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <Heading as="h3" className="text-white mb-4 text-2xl font-bold">Apoya la Causa</Heading>
              <Text className="text-white/80 mb-8 text-lg leading-relaxed font-light">
                Tu donación ayuda a financiar campañas globales, materiales educativos y acciones directas para promover un sistema alimentario basado en plantas.
              </Text>
              <a
                href="https://plantbasedtreaty.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-pbt-green text-white font-medium"
              >
                Hacer una Donación
                <ExternalLink size={20} />
              </a>
            </div>

            <div className="mt-10">
              <a
                href="https://plantbasedtreaty.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 inline-flex items-center gap-2 group font-light"
              >
                Conocer más sobre el Tratado
                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

