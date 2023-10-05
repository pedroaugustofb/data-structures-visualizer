import { ReactNode } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

type Types = "sequential_list" | "linked_list" | "double_linked_list" | "stack";

interface CanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  structure: Types;
  children: ReactNode;
  camera?: {
    fov: number;
    position: [number, number, number];
  };
}

export default function CanvasRoot({ children, camera }: CanvasProps) {
  return (
    <Canvas style={{ height: "100vh" }} camera={camera || { fov: 60, position: [0, 0, 40] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Environment preset="city" />
      <OrbitControls />
      {children}
    </Canvas>
  );
}
