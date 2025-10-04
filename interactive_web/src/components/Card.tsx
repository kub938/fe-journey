"use client";

import { useInView } from "@/app/hooks/useInView";
import styles from "./card.module.css";
import Perspective from "./Perspective";

interface CardProps {
  rotateY?: number;
}

function Card({ rotateY }: CardProps) {
  const { ref, isInView } = useInView({ threshold: 0.5 });

  return (
    <Perspective>
      <div
        ref={ref}
        className={styles.container}
        style={{ transform: `rotateY(${rotateY}deg) rotateX(15deg)` }}
      >
        {isInView ? "보입니다" : "안보여요"}
      </div>
    </Perspective>
  );
}

export default Card;
