"use client";

import { MouseCoords } from "@/types/mouse";
import { useEffect, useRef, useState } from "react";

const SmootherFollower = () => {
  const [targetCoords, setTargetCoords] = useState<MouseCoords>({ x: 0, y: 0 });
  const [currentCoords, setCurrentCoords] = useState<MouseCoords>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [targetCoords]);

  const animationRef = useRef<number>(0);
  const handleMouseMove = (e: MouseEvent) => {
    setTargetCoords({ x: e.clientX, y: e.clientY });
  };

  const animate = () => {
    const newX = currentCoords.x + (targetCoords.x - currentCoords.x) * 0.9;
    const newY = currentCoords.y + (targetCoords.y - currentCoords.y) * 0.9;
    setCurrentCoords({ x: newX, y: newY });
    animationRef.current = requestAnimationFrame(animate);
  };

  const followerStyle: React.CSSProperties = {
    position: "absolute",
    width: "50px",
    height: "50px",
    backgroundColor: "red",
    zIndex: 999,

    left: `${currentCoords.x}px`,
    top: `${currentCoords.y}px`,

    // 요소 중앙을 커서에 맞추기 위해 자신의 크기 50%만큼 되돌리기

    pointerEvents: "none",
  };
  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <div style={followerStyle} />
    </div>
  );
};

export default SmootherFollower;
