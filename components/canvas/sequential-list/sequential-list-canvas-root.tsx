import React from "react";
import { Mesh } from "three";

interface SequentialListCanvasRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index: number;
}

export default function SequentialListCanvasRoot({ children, index }: SequentialListCanvasRootProps) {
  const meshRef = React.useRef<Mesh>();

  const BASE_X = 0;

  const INITIAL_X = index * 2 + 5 - BASE_X;
  const FINAL_X = index * 2 - BASE_X;

  const INITIAL_POSITION = [INITIAL_X, 0, 0] as THREE.Vector3Tuple;
  const FINAL_POSITION = [FINAL_X, 0, 0] as THREE.Vector3Tuple;

  return (
    <mesh ref={meshRef as React.MutableRefObject<Mesh | null>} position={INITIAL_POSITION}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"pink"} />
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          ref: meshRef,
          final_position: FINAL_POSITION,
          initial_position: INITIAL_POSITION,
        });
      })}
    </mesh>
  );
}
