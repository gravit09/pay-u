"use client";

import { motion, Variant, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

// Animation variants
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeInFromLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export const fadeInFromRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
    },
  },
};

// Animation component that triggers when in view
interface AnimateWhenVisibleProps {
  children: ReactNode;
  variants: Variants | { [key: string]: Variant };
  className?: string;
}

export function AnimateWhenVisible({
  children,
  variants,
  className = "",
}: AnimateWhenVisibleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
