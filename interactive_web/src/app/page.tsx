import Card from "@/components/Card";
import styles from "./page.module.css";
import FadeIn from "./(scroll)/fadein/FadeIn";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
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
