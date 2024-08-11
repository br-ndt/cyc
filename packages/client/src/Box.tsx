import { useRef } from "react";
import { Mesh } from "three";

import { useSocket } from "./contexts/SocketContext";

export default function Box() {
  const { cubeTransform, isHover, setHover } = useSocket();
  const boxRef = useRef<Mesh>(null!);
  return (
    <mesh
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      ref={boxRef}
      castShadow
      position={cubeTransform.position}
      rotation={cubeTransform.rotation}
    >
      <boxGeometry args={[2, 2, 2]} />
      {isHover ? <meshStandardMaterial /> : <meshNormalMaterial />}
    </mesh>
  );
}
