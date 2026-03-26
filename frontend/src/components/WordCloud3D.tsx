import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { WordData } from "../types";

function spherePositions(n: number, radius: number): [number, number, number][] {
  const phi = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    return [Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius];
  });
}

function weightToColor(w: number): string {
  const hue = Math.round(260 - w * 220);
  const sat = 80 + w * 15;
  const light = 50 + w * 20;
  return `hsl(${hue},${sat}%,${light}%)`;
}

function Word({ word, weight, position }: {
  word: string;
  weight: number;
  position: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const color = useMemo(() => weightToColor(weight), [weight]);
  const size = 0.22 + weight * 0.65;

  useFrame(({ camera }) => {
    ref.current.quaternion.copy(camera.quaternion);
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={size}
      color={hovered ? "#ffffff" : color}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      outlineWidth={hovered ? 0.015 : 0}
      outlineColor="#ffffff"
    >
      {word}
    </Text>
  );
}

function CloudGroup({ words }: { words: WordData[] }) {
  const groupRef = useRef<THREE.Group>(null!);
  const positions = useMemo(() => spherePositions(words.length, 7), [words.length]);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef}>
      {words.map((w, i) => (
        <Word
          key={w.word}
          word={w.word}
          weight={w.weight}
          position={positions[i]}
        />
      ))}
    </group>
  );
}

export function WordCloud3D({ words }: { words: WordData[] }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 60 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <CloudGroup words={words} />
      <OrbitControls enableZoom enablePan={false} />
    </Canvas>
  );
}