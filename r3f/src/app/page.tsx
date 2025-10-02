"use client";

import { Canvas } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import { Suspense } from "react";
import Cloud from "@/components/WordBall";

export default function App() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <fog attach="fog" args={["#202025", 0, 80]} />
      <Suspense fallback={null}>
        <group rotation={[10, 10.5, 10]}>
          <Cloud count={8} radius={20} />
        </group>
      </Suspense>
      <TrackballControls />
    </Canvas>
    // <Canvas>
    //   <ambientLight intensity={Math.PI / 2} />
    //   <spotLight
    //     position={[10, 10, 10]}
    //     angle={0.15}
    //     penumbra={1}
    //     decay={0}
    //     intensity={Math.PI}
    //   />
    //   <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    //   <Box position={[-1.2, 0, 0]} />
    //   <Box position={[1.2, 0, 0]} />
    //   <OrbitControls />
    // </Canvas>
  );
}
