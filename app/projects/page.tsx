'use client';

import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header - Matches Figma/Source Design */}
      <div className="bg-primary text-primary-foreground py-24 px-6 sm:px-8 lg:px-12 pt-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Volver al inicio
            </Link>
          </motion.div>
          
          <motion.h1
            className="mb-6 tracking-tight font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Nuestros Proyectos
          </motion.h1>
          
          <motion.p
            className="text-primary-foreground/80 text-lg sm:text-xl max-w-3xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Cada proyecto es una oportunidad para generar impacto positivo. Descubre cómo el diseño y la comunicación pueden transformar realidades.
          </motion.p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
