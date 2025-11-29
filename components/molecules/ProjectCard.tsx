'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Badge } from '@/components/atoms/Badge';
import { Text } from '@/components/atoms/Text';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <article className="flex flex-col h-full overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-border transition-colors duration-300">
          {/* Thumbnail Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-6 space-y-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title & Client */}
            <div className="space-y-1">
              {project.client && (
                <Text variant="small" className="text-muted-foreground uppercase tracking-wider text-xs">
                  {project.client}
                </Text>
              )}
              <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
            </div>

            {/* Summary */}
            <Text className="text-muted-foreground line-clamp-3 flex-grow">
              {project.summary}
            </Text>

            {/* Read More Link (Visual only, whole card is link) */}
            <div className="pt-2">
              <span className="text-sm font-medium text-primary flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                Ver proyecto
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

