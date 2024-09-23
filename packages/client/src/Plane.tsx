import { usePlane } from "@react-three/cannon";
import { useRef } from "react";
import { Euler, Mesh } from "three";

export default function Plane() {
  const [ref, api] = usePlane(
    () => ({ rotation: [-Math.PI / 2, 0, 0] }),
    useRef<Mesh>(null)
  );

  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[100, 1000]} />
      <gridHelper rotation-x={-Math.PI / 2} args={[1000, 100]} />
      <shadowMaterial color={"#171717"} transparent opacity={0.4} />
      <meshStandardMaterial color={"#145a8f"} />
    </mesh>
  );
}
