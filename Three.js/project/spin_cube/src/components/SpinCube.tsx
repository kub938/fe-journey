"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    if (scene) {
      console.log("scene 생성 완료");
      console.log(scene);
    }
    const camera = new THREE.PerspectiveCamera(100, 800 / 600, 0.1, 1000);

    camera.position.set(3, 3, 5);

    if (camera) {
      console.log("camera 생성 완료");
      console.log(camera);
    }

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(800, 600);

    if (renderer) {
      console.log("renderer 생성 완료");
      console.log(renderer);
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    renderer.render(scene, camera);
  });

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">1단계 : 그냥 큐브</h1>
      <canvas ref={canvasRef} className="border border-gray-400"></canvas>
    </div>
  );
}
