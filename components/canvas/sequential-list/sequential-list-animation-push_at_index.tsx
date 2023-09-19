// @ts-nocheck

import React from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface AddAtEndProps {
  final_position?: THREE.Vector3Tuple;
  base_x?: number;
  operation?: string;
  index?: number;
}

// eslint-disable-next-line react/display-name
export const SequentialListPushAtIndex = React.forwardRef<Mesh, AddAtEndProps>(
  ({ final_position, operation, index, base_x }, ref) => {
    useFrame(() => {
      if (ref.current) {
        if (ref.current.position.x > final_position[0]) ref.current.position.x -= 0.25;
      }
    });

    return <></>;
  }
);

export default SequentialListPushAtIndex;
