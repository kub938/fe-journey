"use client";

import { useState } from "react";
import styles from "./dive.module.css";

function Page() {
  const [isInToScreen, setIsInToScreen] = useState(false);
  const handleResize = () => {
    setIsInToScreen(true);
  };
  return (
    <div className={styles.container}>
      <div>프론트엔드 개발자 김윤배 입니다</div>
      <div
        className={`${styles.white_screen} ${
          isInToScreen ? styles.wite_full_screen : ""
        }`}
        onClick={handleResize}
      >
        들어가유
      </div>
    </div>
  );
}

export default Page;
