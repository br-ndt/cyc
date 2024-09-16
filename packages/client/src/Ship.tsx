import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh, Vector3 } from "three";

const SPEED_CONST = 0.1;

interface ShipProps {
  input: () => {
    boost: boolean;
    brake: boolean;
    movement: number[];
  };
}

export default function Ship({ input }: ShipProps) {
  const { camera } = useThree();
  const groupRef = useRef<Group>(null!);
  const boxRef = useRef<Mesh>(null!);

  useFrame(() => {
    const { boost, brake, movement } = input();
    let speed = SPEED_CONST;
    if (boost) {
      speed *= 3;
    }
    if (brake) {
      speed /= 3;
    }
    groupRef.current.position.x += movement[0];
    groupRef.current.position.y += movement[1];
    groupRef.current.position.z += speed;
    if (groupRef.current.position.y < 1) {
      groupRef.current.position.y = 1;
    }
    if (groupRef.current.position.y > 25) {
      groupRef.current.position.y = 25;
    }
    if (groupRef.current.position.x < -50) {
      groupRef.current.position.x = -50;
    }
    if (groupRef.current.position.x > 50) {
      groupRef.current.position.x = 50;
    }
    if (groupRef.current.position.z > 100) {
      groupRef.current.position.z = 0;
    }

    const offset = new Vector3(
      groupRef.current.position.x,
      groupRef.current.position.y + 2,
      groupRef.current.position.z - 12
    );

    const target = new Vector3(
      groupRef.current.position.x,
      groupRef.current.position.y,
      groupRef.current.position.z + 12
    );

    camera.position.lerp(offset, 0.12);

    camera.lookAt(target);
  });

  return (
    <>
      <group ref={groupRef}>
        <mesh castShadow ref={boxRef}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </group>
    </>
  );
}
