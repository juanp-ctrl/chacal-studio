"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("floatingActions");

  useEffect(() => {
    const handleScroll = () => {
      // Show after 300px of scroll
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    // Chacal Estudio WhatsApp number (international format without +)
    const phoneNumber = "5492944000000"; // Replace with actual number
    const message = encodeURIComponent(t("whatsappMessage"));
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 sm:bottom-8 sm:right-8">
          {/* WhatsApp Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={openWhatsApp}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#20BA5A] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:h-14 sm:w-14"
            aria-label={t("whatsappLabel")}
          >
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.button>

          {/* Scroll to Top Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-accent hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-14 sm:w-14"
            aria-label={t("scrollTopLabel")}
          >
            <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}

