import { Text3D } from "@react-three/drei";
import React, { useRef } from "react";
import { Mesh, Vector3Tuple } from "three";
import * as THREE from "three";

interface SequentialListCanvasRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index: number;
  value: number;
  prev_value: number | undefined;
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
  prev_value,
  operation,
  position,
  color,
  value_input,
}: SequentialListCanvasRootProps) {
  const meshRef = useRef<Mesh | null>(null);

  const BASE_X = 10;
  const FINAL_X = index * 2 - BASE_X;
  const INITIAL_X = index * 2 + 5 - BASE_X;
  const FINAL_Y = value / (value.toString().length * 10);

  let searched = ["search_by_position", "push_at_index", "pop_at_index"].includes(operation) && index === position;

  if (operation === "search_by_value" && value === value_input) {
    searched = true;
  }

  const INITIAL_POSITION: THREE.Vector3Tuple = [INITIAL_X, FINAL_Y, 0];
  const FINAL_POSITION: THREE.Vector3Tuple = [FINAL_X, FINAL_Y, 0];

  const PREV_ITEM_X = index > 0 ? (index - 1) * 2 - BASE_X : null;
  const PREV_ITEM_Y = prev_value ? prev_value / (prev_value.toString().length * 10) : null;

  const PREV_ITEM_POSITION = new THREE.Vector3(
    ...(PREV_ITEM_X ? [PREV_ITEM_X, PREV_ITEM_Y ?? undefined, 0] : [0, 0, 0])
  );

  const FINAL_ITEM_POSITION = new THREE.Vector3(...(FINAL_POSITION as Vector3Tuple));

  const arrowPosition = calculateArrowPosition(PREV_ITEM_POSITION, FINAL_ITEM_POSITION);
  const arrowDirection = calculateArrowDirection(PREV_ITEM_POSITION, FINAL_ITEM_POSITION);

  const hex = 0x000000;

  return (
    <mesh ref={meshRef} position={INITIAL_POSITION}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial transparent color={color} opacity={searched ? 0.5 : 0.2} />
      <Text3D font={font} scale={0.15} position={[-0.35, -0.1, 0.5]}>
        <meshPhysicalMaterial color={"black"} />
        {value}
      </Text3D>
      {index > 0 && (
        <arrowHelper args={[arrowDirection, arrowPosition, arrowPosition.length() - 0.55, hex, 0.1, 0.1]} />
      )}

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

function calculateArrowPosition(finalPosition: THREE.Vector3, nextInitialPosition: THREE.Vector3) {
  const arrowPosition = new THREE.Vector3();
  return arrowPosition.subVectors(finalPosition, nextInitialPosition);
}

function calculateArrowDirection(startPoint: THREE.Vector3, endPoint: THREE.Vector3) {
  const direction = new THREE.Vector3();
  direction.subVectors(endPoint, startPoint);
  return direction.normalize(); // Normalize the vector to get a unit direction
}
