"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const consent = localStorage.getItem("chacal-cookie-consent");
    if (!consent) {
      // Delay slightly for entrance animation
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("chacal-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("chacal-cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t("title")}
      className={cn(
        "fixed bottom-4 left-4 right-4 md:left-4 md:right-4 md:max-w-4xl md:mx-auto z-[60] p-4 md:p-6",
        "bg-(--brand-blue) text-white shadow-2xl rounded-2xl",
        "backdrop-blur-sm border border-white/10 bg-brand-blue/95",
        "transform transition-transform duration-500 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-[calc(100%+1rem)]"
      )}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <div className="flex items-start md:items-center gap-4 flex-1">
          <div className="hidden md:flex p-2 bg-white/10 rounded-full shrink-0">
            <Cookie className="w-6 h-6 text-accent" />
          </div>
          <div className="space-y-2">
            <Text size="sm" className="text-white/90 max-w-3xl">
              {t("message")}{" "}
              <Link 
                href="/terms" 
                className="text-accent hover:text-accent/80 underline underline-offset-4 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                {t("link")}
              </Link>
            </Text>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3 w-full md:w-auto justify-end md:justify-start shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white focus-visible:ring-accent w-full md:w-auto"
          >
            {t("decline")}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleAccept}
            className="bg-accent hover:bg-accent/90 text-white focus-visible:ring-white w-full md:w-auto"
          >
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}

