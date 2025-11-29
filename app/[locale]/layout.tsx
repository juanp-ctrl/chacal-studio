import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import "../globals.css"; 
import { Crimson_Text, DM_Sans, Alex_Brush } from "next/font/google";

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

// Metadata is now handled per-page via generateMetadata

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

