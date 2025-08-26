"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    camera.position.set(3, 3, 5);
    renderer.setSize(800, 600);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      shininess: 100,
    });

    const cube = new THREE.Mesh(geometry, material);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(cube);

    let time = 0;
    const cube_spin_animate = () => {
      // cube.rotation.y += (Math.PI * 2) / 60; //초당 1바퀴
      // cube.rotation.y += (Math.PI * 2) / 120; //2초당 1바퀴

      time += 0.01;
      // const speedX = Math.sin(time) * 0.02;
      const speedY = Math.sin(time * 1.5) * 0.015;
      // const speedZ = Math.sin(time * 0.8) * 0.01;
      cube.rotation.y += speedY;
      // cube.rotation.x += speedX;
      // cube.rotation.z += speedZ;

      const red = (Math.sin(time * 0.5) + 1) / 2;
      const green = (Math.sin(time * 0.2) + 1) / 2;
      const blue = (Math.sin(time * 0.3) + 1) / 2;
      material.color.setRGB(red, green, blue);

      // cube.position.y = Math.sin(time * 2) * 0.3; // 위아래로
      // cube.position.x = Math.cos(time * 1.5) * 0.2;
      // camera.position.x = Math.cos(time) * 5;
      // camera.position.y = Math.sin(time) * 5;
      // camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      requestAnimationFrame(cube_spin_animate);
    };

    cube_spin_animate();
  });

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">1단계 : 그냥 큐브</h1>
      <canvas ref={canvasRef} className="border border-gray-400"></canvas>
    </div>
  );
}
