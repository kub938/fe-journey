"use client";

import { MouseCoords } from "@/types/mouse";
import { useEffect, useRef, useState } from "react";

// use rAF
// const SmootherFollower = () => {
//   const [current, setCurrent] = useState<MouseCoords>({ x: 0, y: 0 });
//   const targetRef = useRef<MouseCoords>({ x: 0, y: 0 });
//   const rafRef = useRef<number>(0);

//   useEffect(() => {
//     const onMove = (e: MouseEvent) => {
//       targetRef.current = { x: e.clientX, y: e.clientY };
//     };
//     window.addEventListener("mousemove", onMove, { passive: true });

//     const animate = () => {
//       setCurrent((prev) => {
//         const t = targetRef.current;
//         return {
//           x: prev.x + (t.x - prev.x) * 0.1,
//           y: prev.y + (t.y - prev.y) * 0.1,
//         };
//       });
//       rafRef.current = requestAnimationFrame(animate);
//     };

//     rafRef.current = requestAnimationFrame(animate);

//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       cancelAnimationFrame(rafRef.current);
//     };
//   }, []);

//   const followerStyle: React.CSSProperties = {
//     position: "fixed",
//     width: "50px",
//     height: "50px",
//     backgroundColor: "red",
//     zIndex: 999,

//     left: `${current.x}px`,
//     top: `${current.y}px`,

//     pointerEvents: "none",
//   };
//   return (
//     <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
//       <div style={followerStyle} />
//     </div>
//   );
// };

// export default SmootherFollower;

// use Transition
const TransitionFollower = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  const followerStyle: React.CSSProperties = {
    position: "fixed",
    width: "50px",
    height: "50px",
    backgroundColor: "red",
    transition: "all 0.1s ease ", //cubic-bezier(0.19 , 1, 0.22, 1)를 사용하면 직접 속도변화를 조절할 수 있다.
    transform: `translate(${coords.x}px, ${coords.y}px) translate(-50%, -50%)`,
    // transform은 성능 최적화를 위해 반드시 사용해야한다
    // translate(위치 지정) , 요소를 x축과 y축으로 좌표만큼 이동시킨다. top과 left대신 transform: translate() 를 사용하면 브라우저가 gpu를 사용해 위치를 변경하기 때문에 레이아웃을 다시 계산하지 않아(Composite-only) js 부담을 줄여준다
    // Composite-only란?
    // layout과 paint 단계를 건너뛰고 최종 composite 단계만 다시 실행한다는 뜻
    pointerEvents: "none",
  };

  return <div style={followerStyle} />;
};

export default TransitionFollower;
