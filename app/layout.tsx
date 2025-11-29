import type { Metadata } from "next";
import { Crimson_Text, DM_Sans, Alex_Brush } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

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

export const metadata: Metadata = {
  title: "Chacal Studio | Regenerative Design & Technology",
  description: "Strategic design and technology for a regenerative future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${crimsonText.variable} ${dmSans.variable} ${alexBrush.variable}`}>
      <body className="antialiased bg-background text-foreground font-body">
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
      </body>
    </html>
  );
}
