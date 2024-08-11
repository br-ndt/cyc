import { useRef } from "react";
import { Mesh } from "three";

import { useSocket } from "./contexts/SocketContext";

export default function Box() {
  const { cubeTransform } = useSocket();
  const boxRef = useRef<Mesh>(null!);
  return (
    <mesh ref={boxRef} castShadow position={cubeTransform.position} rotation={cubeTransform.rotation}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial />
    </mesh>
  );
}
