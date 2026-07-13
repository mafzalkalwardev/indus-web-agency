"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus } from "@react-three/drei";
import type { Group, Mesh } from "three";

const CYAN = "#22d3ee";
const NAVY_LIGHT = "#67e8f9";

function Sculpture() {
  const group = useRef<Group>(null);
  const solid = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.12;
      group.current.rotation.x = Math.sin(t * 0.18) * 0.12;
    }
    if (solid.current) {
      solid.current.rotation.y = -t * 0.2;
      solid.current.rotation.z = t * 0.08;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.7}>
      <group ref={group}>
        <Icosahedron args={[1.65, 1]}>
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.28} />
        </Icosahedron>
        <Icosahedron ref={solid} args={[1.02, 0]}>
          <meshStandardMaterial color={CYAN} roughness={0.55} metalness={0.8} flatShading />
        </Icosahedron>
        <Torus args={[2.15, 0.008, 16, 120]} rotation={[Math.PI / 2.2, 0.3, 0]}>
          <meshBasicMaterial color={NAVY_LIGHT} transparent opacity={0.85} />
        </Torus>
        <Torus args={[2.45, 0.005, 16, 120]} rotation={[Math.PI / 1.7, -0.4, 0.6]}>
          <meshBasicMaterial color={CYAN} transparent opacity={0.35} />
        </Torus>
      </group>
    </Float>
  );
}

export function AgencyScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} color="#e0f2fe" />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#0891b2" />
      <Sculpture />
    </Canvas>
  );
}
