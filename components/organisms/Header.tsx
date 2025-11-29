"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/atoms/Logo";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMobileMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "The Method", href: "/#method", type: "anchor" },
    // { label: "Projects", href: "/#projects", type: "anchor" },
    { label: "Our Impact", href: "/#impact", type: "anchor" },
    { label: "Services", href: "/#services", type: "anchor" },
    { label: "Projects", href: "/projects", type: "route" },
    { label: "Plant Based Treaty", href: "/#plant-based", type: "anchor" },
  ];

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string, type: string) => {
    if (type === "anchor") {
      // Prevent default ONLY for anchors, not for routes
      
      // Extract target id from href (e.g., "/#method" -> "method")
      const targetId = href.split("#")[1];
      
      if (pathname === "/" && targetId) {
        e.preventDefault();
        // Smooth scroll if on home page
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsMobileMenuOpen(false);
        }
      } else if (targetId) {
        // Allow default navigation for hash links from other pages
        // The browser will handle the jump to hash after navigation
        setIsMobileMenuOpen(false);
      }
    } else {
        // Default navigation for routes
        setIsMobileMenuOpen(false);
    }
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
              key={link.label}
              href={link.href}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavigation(e, link.href, link.type)}
              className="text-sm font-medium text-white/90 hover:text-accent transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          <Button 
            variant="default" 
            size="sm" 
            className="bg-accent hover:bg-(--accent)/90 text-white rounded-full px-6"
            onClick={() => {
                // Contact anchor
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                else if (pathname !== '/') router.push('/#contact');
            }}
          >
            Contact
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-(--brand-blue) md:hidden transition-transform duration-300 ease-in-out flex flex-col items-center justify-center gap-8",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: "0", paddingTop: "80px" }}
      >
        <nav className="flex flex-col items-center gap-6 w-full px-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavigation(e, link.href, link.type)}
              className="text-xl font-medium text-white hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
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
            Contact
          </Button>
        </nav>
      </div>
    </header>
  );
}
