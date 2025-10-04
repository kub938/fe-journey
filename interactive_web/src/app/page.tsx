import Card from "@/components/Card";
import styles from "./page.module.css";
import FadeIn from "./(scroll)/fadein/FadeIn";
import Perspective from "@/components/Perspective";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Card rotateY={15} />
        <Card />
        <Card />
        <Card />
        <Card rotateY={15} />
        <FadeIn direction="left" duration={0.5} delay={0}>
          <Card />
        </FadeIn>

        <FadeIn direction="right" duration={0.5} delay={0}>
          <Card />
        </FadeIn>
      </main>
    </div>
  );
}
