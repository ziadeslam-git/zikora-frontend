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
 * ScrollReveal — Smooth Motion Viewport Entrance Component ("use client").
 * Animates opacity and entrance offset when element scrolls into view.
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 40 };
      case "down":
        return { opacity: 0, y: -40 };
      case "left":
        return { opacity: 0, x: -50 };
      case "right":
        return { opacity: 0, x: 50 };
      case "none":
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Buttery smooth cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
