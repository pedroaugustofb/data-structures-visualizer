import { Text3D } from "@react-three/drei";
import React, { useRef } from "react";
import { Mesh, Vector3Tuple } from "three";
import * as THREE from "three";

interface StackCanvasRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index: number;
  value: number;
  operation: string;
  color: string;
  searched: boolean;
}

const font = "/fonts/roboto_regular.typeface.json";

export default function StackCanvasRoot({ children, index, value, operation, searched, color }: StackCanvasRootProps) {
  const meshRef = useRef<Mesh | null>(null);

  const BASE_X = 10;
  const BASE_HEIGHT = 7;
  const FINAL_HEIGHT = index * 1.4 - BASE_HEIGHT;
  const INITIAL_HEIGHT = index * 2 + 5 - BASE_HEIGHT;

  const INITIAL_POSITION: THREE.Vector3Tuple = [0, INITIAL_HEIGHT, 0];
  const FINAL_POSITION: THREE.Vector3Tuple = [0, FINAL_HEIGHT, 0];

  return (
    <mesh ref={meshRef} position={INITIAL_POSITION}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial transparent color={color} opacity={searched ? 0.5 : 0.2} />
      <Text3D font={font} scale={0.15} position={[-0.35, -0.1, 0.5]}>
        <meshPhysicalMaterial color={"black"} />
        {value}
      </Text3D>

      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          ref: meshRef,
          final_position: FINAL_POSITION,
          base_x: BASE_X,
          initial_position: INITIAL_POSITION,
          operation: operation,
        })
      )}
    </mesh>
  );
}
