import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/SEO/JsonLd";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  const baseUrl = "https://chacalestudio.ar";
  const currentPath = locale === routing.defaultLocale ? "/privacy" : `/${locale}/privacy`;
  const canonicalUrl = `${baseUrl}${currentPath}`;
  const alternateEs = `${baseUrl}${locale === "es" ? "/privacy" : "/es/privacy"}`;
  const alternateEn = `${baseUrl}${locale === "en" ? "/privacy" : "/en/privacy"}`;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: alternateEs,
        en: alternateEn,
        "x-default": alternateEs,
      },
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: canonicalUrl,
      siteName: "Chacal Estudio",
      locale: locale === "es" ? "es_AR" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("meta.title"),
      description: t("meta.description"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  const baseUrl = "https://chacalestudio.ar";
  const currentPath = locale === routing.defaultLocale ? "/privacy" : `/${locale}/privacy`;
  const canonicalUrl = `${baseUrl}${currentPath}`;

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "es" ? "Inicio" : "Home",
        item: `${baseUrl}${locale === routing.defaultLocale ? "" : `/${locale}`}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("title"),
        item: canonicalUrl,
      },
    ],
  };

  // Last updated date
  const lastUpdatedDate = new Date("2025-01-15").toLocaleDateString(
    locale === "es" ? "es-AR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <div className="bg-(--brand-blue) min-h-screen">
        {/* Header Section */}
        <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h1" size="h1" className="text-white mb-4">
              {t("title")}
            </Heading>
            <Text className="text-white/70">
              {t("lastUpdated")}: {lastUpdatedDate}
            </Text>
          </div>
        </section>

        {/* Content Section */}
        <section className="pb-24 px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 sm:p-12 space-y-12">
              
              {/* Introduction */}
              <PolicySection title={t("intro.title")}>
                <Text>{t("intro.text")}</Text>
              </PolicySection>

              {/* Data Collection */}
              <PolicySection title={t("dataCollection.title")}>
                <Text className="mb-6">{t("dataCollection.intro")}</Text>
                
                <div className="space-y-6">
                  <DataItem
                    title={t("dataCollection.contactForm.title")}
                    description={t("dataCollection.contactForm.text")}
                  />
                  <DataItem
                    title={t("dataCollection.cookies.title")}
                    description={t("dataCollection.cookies.text")}
                  />
                  <DataItem
                    title={t("dataCollection.analytics.title")}
                    description={t("dataCollection.analytics.text")}
                  />
                </div>
              </PolicySection>

              {/* Data Usage */}
              <PolicySection title={t("dataUsage.title")}>
                <Text className="mb-4">{t("dataUsage.intro")}</Text>
                <ul className="list-disc list-outside ml-6 space-y-2 text-foreground/90">
                  <li><Text as="span">{t("dataUsage.items.respond")}</Text></li>
                  <li><Text as="span">{t("dataUsage.items.improve")}</Text></li>
                  <li><Text as="span">{t("dataUsage.items.communicate")}</Text></li>
                  <li><Text as="span">{t("dataUsage.items.legal")}</Text></li>
                </ul>
              </PolicySection>

              {/* Data Protection */}
              <PolicySection title={t("dataProtection.title")}>
                <Text>{t("dataProtection.text")}</Text>
              </PolicySection>

              {/* User Rights */}
              <PolicySection title={t("userRights.title")}>
                <Text className="mb-4">{t("userRights.intro")}</Text>
                <ul className="list-disc list-outside ml-6 space-y-2 text-foreground/90 mb-4">
                  <li><Text as="span">{t("userRights.access")}</Text></li>
                  <li><Text as="span">{t("userRights.rectification")}</Text></li>
                  <li><Text as="span">{t("userRights.deletion")}</Text></li>
                  <li><Text as="span">{t("userRights.opposition")}</Text></li>
                </ul>
                <Text>{t("userRights.outro")}</Text>
              </PolicySection>

              {/* Third-Party Services */}
              <PolicySection title={t("thirdParty.title")}>
                <Text className="mb-4">{t("thirdParty.text")}</Text>
                <Text muted>{t("thirdParty.cookieNote")}</Text>
              </PolicySection>

              {/* Contact */}
              <PolicySection title={t("contact.title")}>
                <Text className="mb-6">{t("contact.text")}</Text>
                <div className="bg-secondary/50 rounded-xl p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <Text weight="medium" as="span" className="text-foreground">
                      {t("contact.email")}:
                    </Text>
                    <a
                      href="mailto:hola@chacalestudio.ar"
                      className="text-accent hover:underline font-medium transition-colors"
                    >
                      hola@chacalestudio.ar
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <Text weight="medium" as="span" className="text-foreground">
                      {t("contact.location")}:
                    </Text>
                    <Text as="span">Patagonia, Argentina</Text>
                  </div>
                </div>
              </PolicySection>

              {/* Updates */}
              <PolicySection title={t("updates.title")}>
                <Text>{t("updates.text")}</Text>
              </PolicySection>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// Helper Components
function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Heading as="h2" size="h4" className="text-foreground mb-4 pb-2 border-b border-border">
        {title}
      </Heading>
      {children}
    </section>
  );
}

function DataItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="pl-4 border-l-2 border-accent/50">
      <Heading as="h3" size="h6" className="text-foreground mb-1">
        {title}
      </Heading>
      <Text size="sm" muted>
        {description}
      </Text>
    </div>
  );
}

