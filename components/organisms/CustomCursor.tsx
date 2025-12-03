"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { LogoMinimal } from "@/components/atoms/LogoMinimal";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring configuration for smooth follow
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check for touch device
    const checkTouch = () => {
      const isTouch = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
        
      setIsTouchDevice(isTouch);
      
      // Only show if not touch device
      if (!isTouch) {
        setIsVisible(true);
      }
    };

    checkTouch();
    
    // Resize listener to re-check (e.g. dev tools toggle)
    window.addEventListener('resize', checkTouch);
    
    return () => {
      window.removeEventListener('resize', checkTouch);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target or its parents are interactive
      const isInteractive = 
        target.closest("a") || 
        target.closest("button") || 
        target.closest("input") || 
        target.closest("textarea") || 
        target.closest("select") ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(!!isInteractive);
    };
    
    const handleMouseOut = () => {
        setIsHovering(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isTouchDevice, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center"
      )}
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut"
        }}
        className="w-8 h-8 flex items-center justify-center"
      >
        <LogoMinimal className="text-white w-full h-full" />
      </motion.div>
    </motion.div>
  );
};

