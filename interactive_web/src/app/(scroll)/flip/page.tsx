"use client";

import { useEffect, useState } from "react";

export default function ScrollScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // 스크롤 값에 따라 확대 (최대 2배, 최소 1배)
      const newScale = Math.min(2, 1 + scrollY / 500);
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ height: "200vh", background: "#f0f0f0" }}>
      <div
        style={{
          position: "sticky",
          top: "30%",
          margin: "0 auto",
          width: "200px",
          height: "200px",
          background: "tomato",
          transform: `scale(${scale})`,
          transition: "transform 0.1s linear", // 부드럽게
        }}
      />
    </div>
  );
}
