import * as THREE from "three";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Billboard, Text, TrackballControls } from "@react-three/drei";
import { generate } from "random-words";

interface WordProps {
  children: string;
  position: THREE.Vector3;
}

function Word({ children, ...props }: WordProps) {
  const color = new THREE.Color();
  const fontProps = {
    font: "/Inter-Bold.woff",
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
  };
  const out = () => setHovered(false);

  // Change the mouse cursor on hover
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  // Tie component to the render-loop
  useFrame(() => {
    if (ref.current && ref.current.material) {
      const material = ref.current.material as THREE.MeshBasicMaterial;
      material.color.lerp(color.set(hovered ? "#fa2720" : "white"), 0.1);
    }
  });

  return (
    // billboard 컴포넌트는 안의 컴포넌트들이 항상 카메라를 향하게 만든다
    // ui, 체력바 같은 요소들에 많이 사용함
    <Billboard {...props}>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={() => console.log("clicked")}
        {...fontProps}
        children={children}
      />
    </Billboard>
  );
}

interface CloudProps {
  count?: number;
  radius?: number;
}

//구 모양을 만드는 핵심 코드
function Cloud({ count = 4, radius = 20 }: CloudProps) {
  // Create a count x count random words with spherical distribution
  const words = useMemo(() => {
    const temp: [THREE.Vector3, string][] = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;

    for (let i = 1; i < count + 1; i++) {
      for (let j = 0; j < count; j++) {
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
          ),
          generate() as string,
        ]);
      }
    }
    return temp;
  }, [count, radius]);

  return (
    <>
      {words.map(([pos, word], index) => (
        <Word key={index} position={pos} children={word} />
      ))}
    </>
  );
}

export default Cloud;
