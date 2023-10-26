import { Text3D } from "@react-three/drei";
import React from "react";
import { Mesh } from "three";
import * as THREE from "three";
import BinaryTree, { TreeNode } from "../../../data-structures/BinaryTree";

interface BinaryTreeI extends React.HTMLAttributes<HTMLDivElement> {
  tree: TreeNode;
  color: string;
  search: number;
  depth: number;
  position: [number, number, number];
  spacing: number;
  operation: string;
}

const font = "/fonts/roboto_regular.typeface.json";

export default function BinaryTreeRoot({ tree, position, depth, color, search, spacing, operation }: BinaryTreeI) {
  if (tree === null) return null;
  const { value, left, right } = tree;

  const founded = value === search && operation === "search";

  return (
    <group position={position}>
      <TreeNode3D position={position} value={value} color={color} searched={founded} />
      {left && (
        <>
          {/* <Arrow start={position} end={[position[0] - spacing, position[1] - 1.5, position[2]]} /> */}
          <BinaryTreeRoot
            color={color}
            search={search}
            tree={left}
            position={[position[0] - spacing, position[1] - 1.5, position[2]]}
            depth={depth + 1}
            spacing={spacing / 2}
            operation={operation}
          />
        </>
      )}
      {right && (
        <>
          {/* <Arrow start={position} end={[position[0] + spacing, position[1] - 1.5, position[2]]} /> */}
          <BinaryTreeRoot
            color={color}
            search={search}
            tree={right}
            position={[position[0] + spacing, position[1] - 1.5, position[2]]}
            depth={depth + 1}
            spacing={spacing / 2}
            operation={operation}
          />
        </>
      )}
    </group>
  );
}

interface TreeNodeI {
  position: [number, number, number];
  value: number;
  color: string;
  searched: boolean;
}

const TreeNode3D = ({ position, value, color, searched }: TreeNodeI) => {
  const nodeRef = React.useRef<Mesh | null>(null);

  return (
    <mesh ref={nodeRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial transparent color={color} opacity={searched ? 0.5 : 0.2} />
      <Text3D font={font} scale={0.15} position={[-0.35, -0.1, 0.5]}>
        <meshPhysicalMaterial color={"black"} />
        {value}
      </Text3D>
    </mesh>
  );
};

interface ArrowI {
  start: any;
  end: any;
}

const Arrow = ({ start, end }: ArrowI) => {
  const startVector = new THREE.Vector3(...start);
  const endVector = new THREE.Vector3(...end);
  const arrowDirection = new THREE.Vector3();
  arrowDirection.subVectors(endVector, startVector);

  const hex = 0x000000;

  return (
    <mesh>
      <arrowHelper args={[arrowDirection.normalize(), startVector, arrowDirection.length() + 1.5, hex, 0.1, 0.1]} />
    </mesh>
  );
};
