'use client';

import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CoffeeSceneFallback } from './CoffeeSceneFallback';

// ── 3D Coffee Cup & Liquid ──────────────────────────────────
function CeramicCup() {
  const cupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cupRef.current) {
      // Very subtle breathing rotation
      cupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <group ref={cupRef} position={[0, -0.6, 0]}>
      {/* Saucer / Plate */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.2, 1.6, 0.15, 48]} />
        <meshStandardMaterial
          color="#2A201F"
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>

      {/* Ceramic Cup Body */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[1.35, 1.05, 1.7, 48, 1, true]} />
        <meshStandardMaterial
          color="#FAF5EF"
          roughness={0.3}
          metalness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cup Base */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.1, 48]} />
        <meshStandardMaterial color="#FAF5EF" roughness={0.3} />
      </mesh>

      {/* Coffee Liquid Surface */}
      <mesh position={[0, 1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.28, 48]} />
        <meshStandardMaterial
          color="#2C1810"
          roughness={0.1}
          metalness={0.4}
        />
      </mesh>

      {/* Crema Art Swirl Ring */}
      <mesh position={[0, 1.555, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.95, 32]} />
        <meshStandardMaterial
          color="#B87333"
          roughness={0.5}
          metalness={0.1}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Cup Handle (Torus) */}
      <mesh position={[1.45, 0.95, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.55, 0.12, 16, 32, Math.PI * 1.1]} />
        <meshStandardMaterial color="#FAF5EF" roughness={0.3} />
      </mesh>
    </group>
  );
}

// ── Floating Coffee Beans ───────────────────────────────────
function FloatingBeans() {
  const beansCount = 7;
  const beans = useMemo(() => {
    return Array.from({ length: beansCount }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 4.5,
        Math.random() * 2.5 - 0.2,
        (Math.random() - 0.5) * 3.5,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: 0.18 + Math.random() * 0.08,
      speed: 0.8 + Math.random() * 0.8,
    }));
  }, []);

  return (
    <>
      {beans.map((bean, idx) => (
        <Float
          key={idx}
          speed={bean.speed}
          rotationIntensity={1.2}
          floatIntensity={1.5}
          position={bean.position}
        >
          <mesh rotation={bean.rotation} scale={bean.scale}>
            {/* Bean shape using flattened ellipsoid sphere */}
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#1C0F0A"
              roughness={0.35}
              metalness={0.25}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// ── Steam Particles ─────────────────────────────────────────
function SteamParticles() {
  const count = 35;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, initialY] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initY = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.8;
      const y = 1.6 + Math.random() * 1.8;
      pos[i * 3 + 1] = y;
      initY[i] = y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    return [pos, initY];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        array[i * 3 + 1] += delta * 0.45; // Ascend
        array[i * 3] += Math.sin(array[i * 3 + 1] * 2) * 0.002; // Gentle wisp drift

        // Reset particle to cup surface when reaching top
        if (array[i * 3 + 1] > 3.6) {
          array[i * 3 + 1] = 1.6;
          array[i * 3] = (Math.random() - 0.5) * 0.8;
          array[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#F5EDE4"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Main Scene Canvas Wrapper ───────────────────────────────
export function CoffeeScene() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!isClient || !hasWebGL) {
    return <CoffeeSceneFallback />;
  }

  return (
    <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[600px] cursor-grab active:cursor-grabbing select-none">
      <Suspense fallback={<CoffeeSceneFallback />}>
        <Canvas
          camera={{ position: [0, 2.2, 4.8], fov: 42 }}
          dpr={[1, 1.75]} // Optimized pixel ratio for performance
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          {/* Lighting Rig */}
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.8}
            color="#FFF4E6"
          />
          {/* Warm Copper Rim Light */}
          <spotLight
            position={[-4, 3, -2]}
            intensity={2.2}
            color="#B87333"
            angle={0.6}
            penumbra={0.8}
          />
          {/* Subtle underglow */}
          <pointLight position={[0, -1, 1]} intensity={0.6} color="#B87333" />

          {/* 3D Scene Components */}
          <CeramicCup />
          <FloatingBeans />
          <SteamParticles />

          {/* Gentle interactive Orbit Controls restricted to cinematic angles */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
