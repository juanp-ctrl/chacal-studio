"use client";

import { motion, useInView, Variants, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/atoms/Heading";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div" | "p";
  delay?: number;
}

export function AnimatedText({ 
  text, 
  className, 
  as: Component = "h1",
  delay = 0 
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const shouldReduceMotion = useReducedMotion();

  // Split text into words and then letters to handle spacing correctly
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.03, 
        delayChildren: delay * i 
      },
    }),
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // If user prefers reduced motion, show text immediately without animation
  if (shouldReduceMotion) {
    // If it's a heading, we render the Heading component to maintain styles
    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(Component)) {
      // Cast component to specific heading type for type safety
      const HeadingTag = Component as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Heading as={HeadingTag} className={cn("font-heading", className)}>
          {text}
        </Heading>
      );
    }
    // Otherwise render standard element
    return <Component className={cn("font-body", className)}>{text}</Component>;
  }

  // Determine if we should render as a Heading component or standard HTML element
  const isHeading = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(Component);

  const content = (
    <motion.span
      ref={ref}
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="sr-only-focusable" // Ensure screen readers read the full text, not individual letters
      aria-hidden="true" // Hide the animated structure from screen readers
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block whitespace-nowrap mr-[0.25em]">
          {Array.from(word).map((letter, letterIndex) => (
            <motion.span
              key={`${index}-${letterIndex}`}
              style={{ display: "inline-block" }}
              variants={child}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );

  // Determine font family class based on component type
  // Note: Heading component already applies font-heading by default, so we don't strictly need to force it here
  // but we keep it for consistency. The issue might be that Heading's base styles (font-heading) are winning 
  // or losing against className depending on order.
  // Using cn("relative", fontClass, className) puts className last (highest specificity in tailwind-merge).
  // If the user passes 'font-medium', it should work.
  const fontClass = isHeading ? "font-heading" : "font-body";

  if (isHeading) {
    const HeadingTag = Component as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    return (
      <Heading as={HeadingTag} className={cn("relative", fontClass, className)}>
        <span className="sr-only">{text}</span>
        {content}
      </Heading>
    );
  }

  return (
    <Component className={cn("relative", fontClass, className)}>
      <span className="sr-only">{text}</span>
      {content}
    </Component>
  );
}

