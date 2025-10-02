"use client";

import { useInView } from "@/app/hooks/useInView";
import { ReactNode } from "react";
import styles from "./fadein.module.css";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "right" | "left";
  duration?: number;
  delay?: number;
}

function FadeIn({
  children,
  direction = "right",
  duration,
  delay,
}: FadeInProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`${styles.base} ${
        isInView ? styles.visible : styles[direction]
      }`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default FadeIn;
