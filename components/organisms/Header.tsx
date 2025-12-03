"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { Menu, X, Globe } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Logo } from "@/components/atoms/Logo";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("nav");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    setIsLangMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        if (isLangMenuOpen) setIsLangMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen, isLangMenuOpen]);

  const navLinks = [
    { label: t("method"), href: "/#method", type: "anchor" },
    { label: t("impact"), href: "/#impacto", type: "anchor" },
    { label: t("services"), href: "/#servicios", type: "anchor" },
    { label: t("projects"), href: "/projects", type: "route" },
    { label: t("plantBased"), href: "/#plant-based-treaty", type: "anchor" },
  ];

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string, type: string) => {
    if (type === "anchor") {
      const targetId = href.split("#")[1];
      
      if (pathname === "/" && targetId) {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsMobileMenuOpen(false);
        }
      } else if (targetId) {
        setIsMobileMenuOpen(false);
      }
    } else {
        setIsMobileMenuOpen(false);
    }
  };

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsLangMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "bg-(--brand-blue)/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-5",
        className
      )}
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
            href="/" 
            className="block w-24 md:w-28 transition-opacity hover:opacity-90"
            aria-label="Chacal Studio - Home"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavigation(e, "/", "route")}
        >
          <Logo className="text-white" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" role="navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavigation(e, link.href, link.type)}
              className="text-sm font-medium text-white/90 hover:text-accent transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              {link.label}
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          {/* Language Switcher */}
          <div className="relative cursor-pointer">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 text-white/90 hover:text-accent transition-colors text-sm font-medium uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm cursor-pointer"
              aria-expanded={isLangMenuOpen}
              aria-haspopup="true"
              aria-label={t("switchLanguage")}
            >
              <Globe size={18} />
              {locale === 'es' ? 'ES' : 'EN'}
            </button>
            {isLangMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden py-1 min-w-[100px]">
                <button
                  onClick={() => switchLocale('es')}
                  className={cn(
                    "block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-800 cursor-pointer",
                    locale === 'es' && "font-bold bg-gray-50"
                  )}
                >
                  Español
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={cn(
                    "block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-800 cursor-pointer",
                    locale === 'en' && "font-bold bg-gray-50"
                  )}
                >
                  English
                </button>
              </div>
            )}
          </div>

          <Button 
            variant="default" 
            size="sm" 
            className="bg-accent hover:bg-(--accent)/90 text-white rounded-full px-6 cursor-pointer"
            onClick={() => {
                const element = document.getElementById('contact'); // Assuming contact section has id 'contact'
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                else if (pathname !== '/') router.push('/#contact'); // Or logic to scroll to footer contact if distinct
            }}
          >
            {t('contact')}
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md cursor-pointer"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-(--brand-blue) md:hidden transition-transform duration-300 ease-in-out flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label={t("menu")}
      >
        {/* Close Button Header */}
        <div className={cn(
          "container mx-auto px-4 md:px-6 flex items-center justify-end w-full",
          isScrolled ? "py-3" : "py-5"
        )}>
          <button
            className="text-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md cursor-pointer z-[70] relative"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center gap-6 w-full px-8 flex-1 -mt-20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavigation(e, link.href, link.type)}
              className="text-xl font-medium text-white hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => switchLocale('es')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors border border-white/20 cursor-pointer",
                locale === 'es' ? "bg-accent text-white border-accent" : "text-white hover:bg-white/10"
              )}
            >
              Español
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors border border-white/20 cursor-pointer",
                locale === 'en' ? "bg-accent text-white border-accent" : "text-white hover:bg-white/10"
              )}
            >
              English
            </button>
          </div>

          <Button 
            variant="default" 
            size="lg" 
            className="bg-accent hover:bg-(--accent)/90 text-white rounded-full px-8 w-full max-w-xs mt-4"
            onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                else if (pathname !== '/') router.push('/#contact');
                setIsMobileMenuOpen(false);
            }}
          >
            {t('contact')}
          </Button>
        </nav>
      </div>
    </header>
  );
}
