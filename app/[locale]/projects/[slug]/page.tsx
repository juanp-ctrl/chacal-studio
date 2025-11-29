import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Target, Lightbulb, TrendingUp } from "lucide-react";
import * as Motion from "motion/react-client";
import { projects } from "@/lib/projects";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

// Define params type for Next.js 16
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
    };
  }

  return {
    title: `${project.title} | Chacal Studio`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - Absolute positioned below header */}
      <Motion.div
        className="absolute top-24 left-0 right-0 z-40 px-6 sm:px-8 lg:px-12"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/80 hover:text-accent transition-colors duration-300 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Volver a proyectos
          </Link>
        </div>
      </Motion.div>

      {/* Hero Section */}
      <div className="relative h-[75vh] sm:h-[80vh] overflow-hidden bg-primary mt-0">
        <Motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={project.thumbnail} // Using thumbnail as hero for now if heroImage missing
            alt={project.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        </Motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 sm:px-8 lg:px-12 pb-12 sm:pb-20 pt-32">
            <div className="max-w-7xl mx-auto">
              <Motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {project.tags && project.tags[0] && (
                  <Text className="text-accent uppercase tracking-wider font-medium mb-3 sm:mb-4">
                    {project.tags[0]}
                  </Text>
                )}
                <Heading
                  as="h1"
                  className="text-white mb-4 sm:mb-6 tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl"
                >
                  {project.title}
                </Heading>
                <Text className="text-white/90 text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl mb-8 sm:mb-10">
                  {project.summary}
                </Text>

                {/* Project Meta Info */}
                <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-12 text-white/80">
                  {project.client && (
                    <div>
                      <p className="text-white/50 text-sm uppercase tracking-wider mb-1">
                        Cliente
                      </p>
                      <p className="text-base sm:text-lg">{project.client}</p>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <p className="text-white/50 text-sm uppercase tracking-wider mb-1">
                        Año
                      </p>
                      <p className="text-base sm:text-lg">{project.year}</p>
                    </div>
                  )}
                  {project.services && (
                    <div>
                      <p className="text-white/50 text-sm uppercase tracking-wider mb-1">
                        Servicios
                      </p>
                      <p className="text-base sm:text-lg">
                        {project.services.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </Motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Section */}
      {project.challenge && (
        <div className="py-24 sm:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <Heading as="h2" className="text-primary text-2xl sm:text-3xl md:text-4xl">
                    El desafío
                  </Heading>
                </div>
                <Text className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
                  {project.challenge}
                </Text>
              </Motion.div>

              <Motion.div
                className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-secondary"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {project.images && project.images[0] ? (
                  <Image
                    src={project.images[0]}
                    alt="Challenge"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={project.thumbnail}
                    alt="Challenge"
                    fill
                    className="object-cover"
                  />
                )}
              </Motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Solution/Process Section */}
      {(project.solution || project.description) && (
        <div className="py-24 sm:py-32 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-accent" />
                </div>
                <Heading as="h2" className="text-white text-3xl sm:text-4xl md:text-5xl">
                  La solución
                </Heading>
              </div>
              <Text className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-4xl">
                {project.solution || project.description}
              </Text>
            </Motion.div>

            {project.images && project.images[1] && (
              <Motion.div
                className="relative overflow-hidden rounded-3xl aspect-[16/9]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Image
                  src={project.images[1]}
                  alt="Solution"
                  fill
                  className="object-cover"
                />
              </Motion.div>
            )}
          </div>
        </div>
      )}

      {/* Results Section */}
      {project.results && (
        <div className="py-24 sm:py-32 bg-secondary/50">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <Heading as="h2" className="text-primary text-3xl sm:text-4xl md:text-5xl">
                  Resultados
                </Heading>
              </div>
              <Text className="text-primary/80 text-xl sm:text-2xl leading-relaxed font-light">
                {project.results}
              </Text>
            </Motion.div>
          </div>
        </div>
      )}

      {/* Gallery Section */}
      {project.images && project.images.length > 2 && (
        <div className="py-24 sm:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Motion.h2
              className="text-primary mb-16 font-bold text-3xl sm:text-4xl md:text-5xl font-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Galería
            </Motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {project.images.slice(2).map((image, index) => (
                <Motion.div
                  key={index}
                  className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-secondary group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Gallery ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Next Project */}
      <Link
        href={`/projects/${nextProject.slug}`}
        className="block relative h-[60vh] sm:h-[70vh] overflow-hidden bg-primary group cursor-pointer"
      >
        <div className="absolute inset-0">
          <Image
            src={nextProject.thumbnail}
            alt={nextProject.title}
            fill
            className="object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 sm:px-8 lg:px-12 pb-16 sm:pb-24">
            <div className="max-w-7xl mx-auto">
              <Motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Text className="text-accent uppercase tracking-wider font-medium mb-4 sm:mb-6">
                  Siguiente proyecto
                </Text>
                <div className="flex items-center gap-6 mb-6">
                  <Heading
                    as="h2"
                    className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl group-hover:text-accent transition-colors duration-300"
                  >
                    {nextProject.title}
                  </Heading>
                  <ArrowRight
                    size={48}
                    className="flex-shrink-0 text-white group-hover:text-accent group-hover:translate-x-2 transition-all duration-300"
                  />
                </div>
                <Text className="text-white/80 text-lg sm:text-xl max-w-3xl">
                  {nextProject.summary}
                </Text>
              </Motion.div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

