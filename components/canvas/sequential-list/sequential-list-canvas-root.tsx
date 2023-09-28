import { Text3D } from "@react-three/drei";
import React, { useRef } from "react";
import { Mesh, Vector3Tuple } from "three";
import * as THREE from "three";

interface SequentialListCanvasRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index: number;
  value: number;
  operation: string;
  position: number;
  color: string;
  value_input: number;
}

const font = "/fonts/roboto_regular.typeface.json";

export default function SequentialListCanvasRoot({
  children,
  index,
  value,
  operation,
  position,
  color,
  value_input,
}: SequentialListCanvasRootProps) {
  const meshRef = useRef<Mesh | null>(null);

  const BASE_X = 10;
  const FINAL_X = index * 2 - BASE_X;
  const INITIAL_X = index * 2 + 5 - BASE_X;

  let searched = ["search_by_position", "push_at_index", "pop_at_index"].includes(operation) && index === position;

  if (operation === "search_by_value" && value === value_input) {
    searched = true;
  }

  const INITIAL_POSITION: THREE.Vector3Tuple = [INITIAL_X, 0, 0];
  const FINAL_POSITION: THREE.Vector3Tuple = [FINAL_X, 0, 0];

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
