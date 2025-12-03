import { VideoHeroSection } from "@/components/sections/VideoHeroSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { FutureSection } from "@/components/sections/FutureSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PlantBasedTreatySection } from "@/components/sections/PlantBasedTreatySection";
import { SDGSection } from "@/components/sections/SDGSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/SEO/JsonLd";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  const baseUrl = "https://chacalestudio.ar";
  const currentPath = locale === routing.defaultLocale ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${currentPath}`;
  const alternateEs = `${baseUrl}${locale === "es" ? "" : "/es"}`;
  const alternateEn = `${baseUrl}${locale === "en" ? "" : "/en"}`;

  const title =
    locale === "es"
      ? "Chacal Estudio | Comunicación con propósito"
      : "Chacal Estudio | Purpose-Driven Communication";
  const description =
    locale === "es"
      ? "Creamos estrategias de comunicación con propósito desde la Patagonia. Consultoría, asesoría, diagnóstico y gestión comunicacional con enfoque sustentable."
      : "We create purpose-driven communication strategies from Patagonia. Consulting, advisory, diagnosis and communication management with a sustainable focus.";

  return {
    title,
    description,
    keywords:
      locale === "es"
        ? [
            "comunicación con propósito",
            "agencia de comunicación Argentina",
            "consultoría comunicacional",
            "diseño sustentable",
            "comunicación Patagonia",
            "agencia creativa Argentina",
            "triple impacto",
            "sustentabilidad",
            "comunicación estratégica",
          ]
        : [
            "purpose-driven communication",
            "communication agency Argentina",
            "communication consulting",
            "sustainable design",
            "Patagonia communication",
            "creative agency Argentina",
            "triple impact",
            "sustainability",
            "strategic communication",
          ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: alternateEs,
        en: alternateEn,
        "x-default": alternateEs,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Chacal Estudio",
      locale: locale === "es" ? "es_AR" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  const baseUrl = "https://chacalestudio.ar";

  // Organization JSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Chacal Estudio",
    alternateName: "Chacal Studio",
    url: baseUrl,
    logo: `${baseUrl}/logo.webp`,
    description:
      locale === "es"
        ? "Estudio de comunicación y diseño con propósito desde la Patagonia argentina"
        : "Purpose-driven communication and design studio from Argentine Patagonia",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Patagonia",
      addressCountry: "AR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hola@chacalestudio.ar",
      contactType: "customer service",
    },
    sameAs: [
      "https://www.instagram.com/chacal.estudio/",
      "https://www.linkedin.com/company/chacalestudio",
    ],
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
    serviceType: [
      locale === "es"
        ? "Consultoría y estrategia comunicacional"
        : "Communication consulting and strategy",
      locale === "es"
        ? "Asesoría comunicacional"
        : "Communication advisory",
      locale === "es"
        ? "Diagnóstico comunicacional"
        : "Communication diagnosis",
      locale === "es"
        ? "Gestión de la comunicación"
        : "Communication management",
      locale === "es"
        ? "Consultoría Sustentable"
        : "Sustainability Consulting",
    ],
  };

  // WebSite JSON-LD
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Chacal Estudio",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      <div className="flex min-h-screen flex-col">
        <VideoHeroSection />
        <HeroSection />
        <MarqueeSection />
        <MethodSection />
        <FutureSection />
        <ImpactSection />
        <ServicesSection />
        <PlantBasedTreatySection />
        <SDGSection />
        <PartnersSection />
        <ContactSection />
      </div>
    </>
  );
}
