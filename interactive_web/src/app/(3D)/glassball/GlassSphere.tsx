"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import styles from "./glassSphere.module.css";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

function GlassBall() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;

    const width = wrapRef.current.clientWidth;
    const height = wrapRef.current.clientHeight;

    //공 구현
    const ballGeo = new THREE.SphereGeometry(0.6, 128, 128);
    const glassMat = new THREE.MeshPhysicalMaterial({
      metalness: 0.0,
      roughness: 0.02,
      transmission: 1.0,
      ior: 1.5,
      thickness: 0.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      envMapIntensity: 1.2,
      side: THREE.FrontSide,
    });
    const ball = new THREE.Mesh(ballGeo, glassMat);
    //렌더링 세팅
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    wrapRef.current.appendChild(renderer.domElement);

    //환경맵 세팅
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.background = new THREE.Color(0xeef3ff);

    //카메라 세팅
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0.5, 0.5, 2.2);

    scene.add(ball);
    renderer.render(scene, camera);

    //리사이즈 대응
    const handleResize = () => {
      if (!wrapRef.current) return;
      const newWidth = wrapRef.current.clientWidth;
      const newHeight = wrapRef.current.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      pmrem.dispose();
      renderer.dispose();
      wrapRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div className={styles.wrap} ref={wrapRef}></div>;
}

export default GlassBall;
