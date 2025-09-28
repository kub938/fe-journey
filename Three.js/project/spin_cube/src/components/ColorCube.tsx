import { useEffect, useRef } from "react";
import * as THREE from "three";

function ColorCube() {
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
    camera.position.set(0, 5, 10);

    const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    const cubeMat = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);

    scene.add(cubeMesh);

    renderer.render(scene, camera);
  }, []);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}
