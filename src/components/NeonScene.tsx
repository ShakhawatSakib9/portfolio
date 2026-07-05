"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import type { Mesh, Group } from "three";

function NeonCore() {
  const group = useRef<Group>(null);
  const solid = useRef<Mesh>(null);
  const wire1 = useRef<Mesh>(null);
  const wire2 = useRef<Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    // Core rotation
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x += delta * 0.03;

    // Independent wireframe rotations (Gyroscope effect)
    if (wire1.current) {
      wire1.current.rotation.y -= delta * 0.22;
      wire1.current.rotation.x += delta * 0.12;
    }
    if (wire2.current) {
      wire2.current.rotation.y += delta * 0.15;
      wire2.current.rotation.z -= delta * 0.18;
    }

    // Subtle parallax toward cursor
    group.current.position.x += (mouse.current.x * 0.45 - group.current.position.x) * 0.05;
    group.current.position.y += (mouse.current.y * 0.35 - group.current.position.y) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={group}>
        {/* Ambient neon particles floating around the orb */}
        <Sparkles count={35} scale={3.2} size={2} speed={0.4} color="#00fff2" opacity={0.7} />
        <Sparkles count={25} scale={4.2} size={2.5} speed={0.6} color="#7c3aed" opacity={0.5} />

        {/* Pulsing neon core with emissive purple glow */}
        <Icosahedron ref={solid} args={[1.15, 16]}>
          <MeshDistortMaterial
            color="#080711"
            emissive="#581c87"
            emissiveIntensity={1.8}
            roughness={0.15}
            metalness={0.9}
            distort={0.38}
            speed={2.2}
          />
        </Icosahedron>

        {/* Cyan wireframe (inner shell) rotating counter-wise */}
        <Icosahedron ref={wire1} args={[1.45, 2]}>
          <meshBasicMaterial color="#00fff2" wireframe transparent opacity={0.28} />
        </Icosahedron>

        {/* Violet wireframe (outer shell) rotating at another angle */}
        <Icosahedron ref={wire2} args={[1.8, 1]}>
          <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.16} />
        </Icosahedron>
      </group>
    </Float>
  );
}

export default function NeonScene() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      {/* Lights placement to create reflection details */}
      <pointLight position={[4, 3, 5]} intensity={45} color="#00fff2" distance={20} />
      <pointLight position={[-5, -2, 3]} intensity={50} color="#7c3aed" distance={20} />
      <pointLight position={[0, 4, -4]} intensity={25} color="#ff2be8" distance={20} />
      <NeonCore />
    </Canvas>
  );
}
