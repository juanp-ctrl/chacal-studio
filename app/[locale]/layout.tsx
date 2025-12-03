import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { CookieBanner } from "@/components/organisms/CookieBanner";
import { IntroLoader } from "@/components/organisms/IntroLoader";
import { FloatingActions } from "@/components/organisms/FloatingActions";
import { CustomCursor } from "@/components/organisms/CustomCursor";
import "../globals.css"; 
import { Crimson_Text, DM_Sans, Alex_Brush } from "next/font/google";
import type { Metadata } from "next";

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-family-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-family-body",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL("https://chacalestudio.ar"),
    title: {
      template: `%s | Chacal Estudio`,
      default: "Chacal Estudio",
    },
    description: locale === "es" 
      ? "Estudio de comunicación y diseño con propósito desde la Patagonia." 
      : "Purpose-driven communication and design studio from Patagonia.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_US",
      siteName: "Chacal Estudio",
      title: locale === "es" ? "Chacal Estudio" : "Chacal Studio",
      description: locale === "es" 
        ? "Estudio de comunicación y diseño con propósito desde la Patagonia." 
        : "Purpose-driven communication and design studio from Patagonia.",
      images: [
        {
          url: "/logo.webp",
          width: 600,
          height: 600,
          alt: "Chacal Estudio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: locale === "es" ? "Chacal Estudio" : "Chacal Studio",
      description: locale === "es" 
        ? "Estudio de comunicación y diseño con propósito desde la Patagonia." 
        : "Purpose-driven communication and design studio from Patagonia.",
      images: [
        {
          url: "/chacal-paisaje-.webp",
          width: 2435,
          height: 1350,
          alt: "Chacal Estudio - Paisaje",
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale} className={`scroll-smooth ${crimsonText.variable} ${dmSans.variable} ${alexBrush.variable}`}>
      <body className="antialiased bg-background text-foreground font-body">
        <NextIntlClientProvider messages={messages}>
          <IntroLoader />
          <CustomCursor />
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:z-60 focus:top-4 focus:left-4 focus:p-4 focus:bg-white focus:text-(--brand-blue) focus:rounded-md focus:shadow-lg"
          >
            Skip to main content
          </a>
          
          <Header />
          
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          
          <Footer />
          <FloatingActions />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

