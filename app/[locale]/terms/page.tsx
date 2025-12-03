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
  const t = await getTranslations({ locale, namespace: "terms" });

  const baseUrl = "https://chacalestudio.ar";
  const currentPath = locale === routing.defaultLocale ? "/terms" : `/${locale}/terms`;
  const canonicalUrl = `${baseUrl}${currentPath}`;
  const alternateEs = `${baseUrl}${locale === "es" ? "/terms" : "/es/terms"}`;
  const alternateEn = `${baseUrl}${locale === "en" ? "/terms" : "/en/terms"}`;

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

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  const baseUrl = "https://chacalestudio.ar";
  const currentPath = locale === routing.defaultLocale ? "/terms" : `/${locale}/terms`;
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
              
              {/* ==================== TERMS OF SERVICE ==================== */}
              
              {/* Introduction */}
              <PolicySection title={t("intro.title")}>
                <Text>{t("intro.text")}</Text>
              </PolicySection>

              {/* Services Description */}
              <PolicySection title={t("services.title")}>
                <Text>{t("services.text")}</Text>
              </PolicySection>

              {/* Intellectual Property */}
              <PolicySection title={t("intellectualProperty.title")}>
                <Text className="mb-4">{t("intellectualProperty.text")}</Text>
                <Text muted>{t("intellectualProperty.restrictions")}</Text>
              </PolicySection>

              {/* User Conduct */}
              <PolicySection title={t("userConduct.title")}>
                <Text className="mb-4">{t("userConduct.intro")}</Text>
                <ul className="list-disc list-outside ml-6 space-y-2 text-foreground/90">
                  <li><Text as="span">{t("userConduct.items.lawful")}</Text></li>
                  <li><Text as="span">{t("userConduct.items.noHarm")}</Text></li>
                  <li><Text as="span">{t("userConduct.items.noMalware")}</Text></li>
                  <li><Text as="span">{t("userConduct.items.noUnauthorized")}</Text></li>
                </ul>
              </PolicySection>

              {/* Limitation of Liability */}
              <PolicySection title={t("liability.title")}>
                <Text className="mb-4">{t("liability.text")}</Text>
                <Text muted>{t("liability.disclaimer")}</Text>
              </PolicySection>

              {/* External Links */}
              <PolicySection title={t("externalLinks.title")}>
                <Text>{t("externalLinks.text")}</Text>
              </PolicySection>

              {/* Modifications */}
              <PolicySection title={t("modifications.title")}>
                <Text>{t("modifications.text")}</Text>
              </PolicySection>

              {/* Governing Law */}
              <PolicySection title={t("governingLaw.title")}>
                <Text>{t("governingLaw.text")}</Text>
              </PolicySection>

              {/* ==================== COOKIE POLICY ==================== */}
              
              {/* Cookie Policy Section Divider */}
              <div className="pt-8 border-t-2 border-accent/30">
                <Heading as="h2" size="h2" className="text-foreground mb-8">
                  {t("cookies.sectionTitle")}
                </Heading>
              </div>

              {/* What are cookies */}
              <PolicySection title={t("cookies.what.title")} isSubsection>
                <Text>{t("cookies.what.text")}</Text>
              </PolicySection>

              {/* Types of cookies */}
              <PolicySection title={t("cookies.types.title")} isSubsection>
                <div className="space-y-6">
                  <CookieTypeItem
                    title={t("cookies.types.essential.title")}
                    description={t("cookies.types.essential.text")}
                  />
                  <CookieTypeItem
                    title={t("cookies.types.analytics.title")}
                    description={t("cookies.types.analytics.text")}
                  />
                  <CookieTypeItem
                    title={t("cookies.types.preferences.title")}
                    description={t("cookies.types.preferences.text")}
                  />
                </div>
              </PolicySection>

              {/* How to manage cookies */}
              <PolicySection title={t("cookies.manage.title")} isSubsection>
                <Text className="mb-4">{t("cookies.manage.text")}</Text>
                <Text muted>{t("cookies.manage.browserSettings")}</Text>
              </PolicySection>

              {/* Third-party cookies */}
              <PolicySection title={t("cookies.thirdParty.title")} isSubsection>
                <Text>{t("cookies.thirdParty.text")}</Text>
              </PolicySection>

              {/* Your consent */}
              <PolicySection title={t("cookies.consent.title")} isSubsection>
                <Text>{t("cookies.consent.text")}</Text>
              </PolicySection>

              {/* Cookie policy updates */}
              <PolicySection title={t("cookies.updates.title")} isSubsection>
                <Text>{t("cookies.updates.text")}</Text>
              </PolicySection>

              {/* ==================== CONTACT ==================== */}
              
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
  isSubsection = false,
}: {
  title: string;
  children: React.ReactNode;
  isSubsection?: boolean;
}) {
  return (
    <section>
      <Heading
        as={isSubsection ? "h3" : "h2"}
        size={isSubsection ? "h5" : "h4"}
        className={`text-foreground mb-4 pb-2 border-b ${isSubsection ? "border-border/50" : "border-border"}`}
      >
        {title}
      </Heading>
      {children}
    </section>
  );
}

function CookieTypeItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="pl-4 border-l-2 border-accent/50">
      <Heading as="h4" size="h6" className="text-foreground mb-1">
        {title}
      </Heading>
      <Text size="sm" muted>
        {description}
      </Text>
    </div>
  );
}

