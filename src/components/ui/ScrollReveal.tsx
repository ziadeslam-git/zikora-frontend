"use client";

import { motion } from "motion/react";
import React from "react";

export interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * ScrollReveal — Ultra-lightweight 60fps Entrance Component ("use client").
 * Triggers entrance immediately upon entering 1% of viewport for zero scroll lag.
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.3,
  className = "",
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 20 };
      case "down":
        return { opacity: 0, y: -20 };
      case "left":
        return { opacity: 0, x: -25 };
      case "right":
        return { opacity: 0, x: 25 };
      case "none":
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Fast responsive spring cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
