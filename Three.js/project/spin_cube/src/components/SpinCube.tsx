"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / 800,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, 800);

    camera.position.set(0, 3, 5);

    // 컨트롤러
    const controls = new OrbitControls(camera, renderer.domElement);

    // 큐브 + 조명
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

    // 큐브 클릭 상호작용 활성화
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / 800) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects([cube]);

      if (intersects.length > 0) {
        cube.material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      }
    };

    window.addEventListener("click", onClick);
    // 큐브 회전
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
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(cube_spin_animate);
    };

    cube_spin_animate();

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">1단계 : 그냥 큐브</h1>
      <canvas ref={canvasRef} className="border border-gray-400"></canvas>
    </div>
  );
}
