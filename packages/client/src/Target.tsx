import { Triplet, useConvexPolyhedron } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { BufferGeometry, Mesh, Vector3 } from "three";
import { Geometry } from "three-stdlib";
import { useScore } from "./contexts/ScoreContext";

interface ITargetProps {
  onRemove: () => void;
  position: Vector3;
}

function toConvexProps(
  bufferGeometry: BufferGeometry
): [vertices: Triplet[], faces: Triplet[]] {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);
  geo.mergeVertices();
  const vertices: Triplet[] = geo.vertices.map((v) => [v.x, v.y, v.z]);
  const faces: Triplet[] = geo.faces.map((f) => [f.a, f.b, f.c]);
  return [vertices, faces];
}

export default function Target({ onRemove, position }: ITargetProps) {
  const { nodes, materials } = useGLTF("/target.glb");
  const { incrementScore } = useScore();
  const args = useMemo(
    () => toConvexProps(nodes.Cube.geometry),
    [nodes.Cube.geometry]
  );

  const [ref, api] = useConvexPolyhedron(
    () => ({
      args,
      type: "Static",
      mass: 1,
      position: position.toArray(),
      rotation: [0, Math.PI, 0],
      onCollide: (e) => {
        console.log("target hit");
        incrementScore();
        onRemove();
      },
    }),
    useRef<Mesh>(null),
    [incrementScore, onRemove]
  );

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      geometry={nodes.Cube.geometry}
      material={materials.target}
    />
  );
}

useGLTF.preload("/target.glb");
