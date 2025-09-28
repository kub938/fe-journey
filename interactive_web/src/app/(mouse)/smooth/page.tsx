"use client";

import { MouseCoords } from "@/types/mouse";
import { useEffect, useRef, useState } from "react";

const SmootherFollower = () => {
  const [current, setCurrent] = useState<MouseCoords>({ x: 0, y: 0 });
  const targetRef = useRef<MouseCoords>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const animate = () => {
      setCurrent((prev) => {
        const t = targetRef.current;
        return {
          x: prev.x + (t.x - prev.x) * 0.1,
          y: prev.y + (t.y - prev.y) * 0.1,
        };
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const followerStyle: React.CSSProperties = {
    position: "fixed",
    width: "50px",
    height: "50px",
    backgroundColor: "red",
    zIndex: 999,

    left: `${current.x}px`,
    top: `${current.y}px`,

    pointerEvents: "none",
  };
  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <div style={followerStyle} />
    </div>
  );
};

export default SmootherFollower;
