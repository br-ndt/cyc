import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

interface BulletProps {
  onRemove: () => void;
  position: [x: number, y: number, z: number];
}

export default function Bullet({ onRemove, position }: BulletProps) {
  const [ref, api] = useBox(() => ({
    args: [0.5, 0.5, 0.5],
    mass: 1,
    onCollide: () => onRemove(),
    position,
  }));
  const forward = useRef<number>(position[2]);

  useFrame(() => {
    forward.current += 2;
    api.position.set(position[0], position[1], forward.current);
  });

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.25, 0.25, 0.5]} />
      <meshPhongMaterial color="hotpink" />
    </mesh>
  );
}
