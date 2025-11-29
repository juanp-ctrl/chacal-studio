'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Use the first tag as the category
  const category = project.tags[0] || 'Project';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`} className="group block cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5] bg-muted">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            {category}
          </p>
          <h2 className="text-foreground text-2xl sm:text-3xl font-bold font-heading group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
