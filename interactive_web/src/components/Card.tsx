"use client";

import { useInView } from "@/app/hooks/useInView";
import styles from "./card.module.css";

function Card() {
  const { ref, isInView } = useInView({ threshold: 0.5 });

  return (
    <div ref={ref} className={styles.container}>
      {isInView ? "보입니다" : "안보여요"}
    </div>
  );
}

export default Card;
