// @ts-nocheck

import React from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface CubeStackAddProps {
  final_position?: THREE.Vector3Tuple;
}

// eslint-disable-next-line react/display-name
export const CubeStackAdd = React.forwardRef<Mesh, CubeStackAddProps>(({ final_position }, ref) => {
  useFrame(() => {
    if (ref.current) {
      if (ref.current.position.y > final_position[1]) ref.current.position.y -= 0.25;
    }
  });

  return <></>;
});

export default CubeStackAdd;
