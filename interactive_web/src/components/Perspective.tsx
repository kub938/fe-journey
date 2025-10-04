import { ReactNode } from "react";
import styles from "./perspective.module.css";

interface PerspectiveProps {
  children: ReactNode;
}
function Perspective({ children }: PerspectiveProps) {
  return <div className={styles["perspective-container"]}>{children}</div>;
}

export default Perspective;
