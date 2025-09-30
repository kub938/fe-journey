import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

// Floating sphere that moves away from mouse
function FloatingSphere({ position, color }) {
  const meshRef = useRef();
  const [mousePos, setMousePos] = useState(new THREE.Vector3(0, 0, 0));
  const repelForce = useRef(new THREE.Vector3(0, 0, 0));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const { camera } = useThree();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      const vec = new THREE.Vector3(x, y, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      setMousePos(pos);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [camera]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const sphere = meshRef.current;
    const spherePos = sphere.position;

    // Calculate repel force
    const distance = spherePos.distanceTo(mousePos);
    const repelRadius = 3;

    if (distance < repelRadius) {
      const direction = new THREE.Vector3()
        .subVectors(spherePos, mousePos)
        .normalize();
      const force = (1 - distance / repelRadius) * 0.1;
      repelForce.current.copy(direction.multiplyScalar(force));
    } else {
      repelForce.current.multiplyScalar(0.95);
    }

    // Apply forces
    velocity.current.add(repelForce.current);
    velocity.current.multiplyScalar(0.95); // Damping

    // Return to original position gently
    const returnForce = new THREE.Vector3()
      .copy(position)
      .sub(spherePos)
      .multiplyScalar(0.02);
    velocity.current.add(returnForce);

    sphere.position.add(velocity.current);

    // Gentle floating animation
    sphere.position.y +=
      Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
    sphere.rotation.x += delta * 0.2;
    sphere.rotation.y += delta * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// About section with 3D spheres
function AboutSection() {
  const spheres = [
    { pos: [-3, 2, -2], color: "#ff6b9d" },
    { pos: [3, 1, -3], color: "#4ecdc4" },
    { pos: [-2, -1, -1], color: "#ffd93d" },
    { pos: [2, -2, -2], color: "#95e1d3" },
    { pos: [0, 2, -4], color: "#c7ceea" },
    { pos: [-4, 0, -3], color: "#ff9a76" },
    { pos: [4, -1, -1], color: "#a8e6cf" },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />

      {spheres.map((sphere, i) => (
        <FloatingSphere key={i} position={sphere.pos} color={sphere.color} />
      ))}
    </>
  );
}

// Project card with 3D tilt effect
function ProjectCard({ title, description, image, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      x: (y - centerY) / 20,
      y: (centerX - x) / 20,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="flex items-center gap-12 mb-32">
      <div
        ref={cardRef}
        className="w-1/2 relative group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <div
            className="aspect-video bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </div>
        <div
          className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
          style={{ zIndex: -1 }}
        />
      </div>

      <div className="w-1/2">
        <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      title: "Project Alpha",
      description:
        "혁신적인 웹 애플리케이션으로 사용자 경험을 재정의했습니다. React와 Three.js를 활용한 인터랙티브한 3D 인터페이스를 구현했습니다.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%239333ea' width='800' height='450'/%3E%3C/svg%3E",
    },
    {
      title: "Project Beta",
      description:
        "AI 기반 데이터 시각화 플랫폼을 개발했습니다. 복잡한 데이터를 직관적이고 아름다운 그래픽으로 표현했습니다.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23ec4899' width='800' height='450'/%3E%3C/svg%3E",
    },
    {
      title: "Project Gamma",
      description:
        "모바일 퍼스트 접근으로 설계된 소셜 네트워킹 앱입니다. 실시간 채팅과 미디어 공유 기능을 구현했습니다.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%233b82f6' width='800' height='450'/%3E%3C/svg%3E",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* About Section with 3D Background */}
      <section className="h-screen relative">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <AboutSection />
          </Canvas>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center max-w-3xl px-8">
            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Creative Developer
            </h1>
            <p className="text-2xl text-gray-300 leading-relaxed">
              안녕하세요! 인터랙티브한 웹 경험을 만드는 것을 좋아하는
              개발자입니다. 3D 그래픽과 창의적인 코딩으로 사용자들에게 특별한
              경험을 선사합니다.
            </p>
            <div className="mt-12 text-gray-500 animate-bounce">
              <svg
                className="w-8 h-8 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="min-h-screen py-32 px-16 bg-gradient-to-b from-black to-gray-900">
        <h2 className="text-6xl font-bold text-center mb-24 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Projects
        </h2>

        <div className="max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
