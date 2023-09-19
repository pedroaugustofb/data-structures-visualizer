// @ts-nocheck

import React from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface AddAtEndProps {
  final_position?: THREE.Vector3Tuple;
  operation?: string;
}

// eslint-disable-next-line react/display-name
export const SequentialListAddAtEnd = React.forwardRef<Mesh, AddAtEndProps>(({ final_position, operation }, ref) => {
  useFrame(() => {
    if (ref.current && (operation === "push_at_end" || operation === "search_by_position")) {
      if (ref.current.position.x > final_position[0]) ref.current.position.x -= 0.25;
    }
  });

  return <></>;
});

export default SequentialListAddAtEnd;
