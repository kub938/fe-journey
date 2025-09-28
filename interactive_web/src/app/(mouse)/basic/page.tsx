"use client";

import { MouseCoords } from "@/types/mouse";
import { useEffect, useState } from "react";

const MouseTracker = () => {
  const [coords, setCoords] = useState<MouseCoords>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const followerStyle: React.CSSProperties = {
    position: "absolute",
    width: "50px",
    height: "50px",
    backgroundColor: "red",
    zIndex: 999,

    left: `${coords.x}px`,
    top: `${coords.y}px`,

    // 요소 중앙을 커서에 맞추기 위해 자신의 크기 50%만큼 되돌리기
    transform: "translate(-50%, -50%)",

    pointerEvents: "none",
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <div style={followerStyle} />
      <div style={{ position: "fixed", top: 10, left: 10, color: "#333" }}>
        X: {coords.x}, Y: {coords.y}
      </div>
    </div>
  );
};

export default MouseTracker;

//pageY 와 clientY의 차이점
//pageY는 페이지 전체에서 내 마우스의 y값, clientY는 viewport(내화면)기준 내 마우스 y값
