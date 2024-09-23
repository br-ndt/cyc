import { useFrame, useThree } from "@react-three/fiber";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Group, MathUtils, Vector3 } from "three";
import Bullet from "./Bullet";
import { ShipModel } from "./ShipModel";
import { useScore } from "./contexts/ScoreContext";

const SPEED_CONST = 0.1;
const TURNING_COEFF = 0.75;
const FIRING_COOLDOWN = 0.25;

interface IShipProps {
  input: () => {
    boost: boolean;
    brake: boolean;
    firing: boolean;
    lean: number;
    movement: number[];
  };
  resetTargets: () => void;
}

export default function Ship({ input, resetTargets }: IShipProps) {
  const { camera } = useThree();
  const { resetScore } = useScore();
  const groupRef = useRef<Group>(null!);
  const shipRef = useRef<Group>(null!);
  const [canFire, setCanFire] = useState<boolean>(false);
  const [tryingToFire, setTryingToFire] = useState<boolean>(false);
  const [bullets, setBullets] = useState<{ [id: string]: ReactNode }>({});

  const removeBullet = (id: string) => {
    setBullets({ ...bullets, [id]: null });
  };

  useEffect(() => {
    if (canFire) return;
    setTimeout(() => {
      setCanFire(true);
    }, FIRING_COOLDOWN * 1000);
  }, [canFire]);

  useEffect(() => {
    if (canFire && tryingToFire) {
      const key = `${bullets.length}${groupRef.current.position.x}${groupRef.current.position.y}${groupRef.current.position.z}`;
      setBullets({
        ...bullets,
        [key]: (
          <Bullet
            key={key}
            onRemove={() => removeBullet(key)}
            position={[
              groupRef.current.position.x,
              groupRef.current.position.y,
              groupRef.current.position.z + 1,
            ]}
          />
        ),
      });
      setCanFire(false);
    }
  }, [canFire, tryingToFire]);

  useFrame(() => {
    const { boost, brake, firing, lean, movement } = input();
    let speed = SPEED_CONST;
    if (boost) {
      speed *= 3;
    }
    if (brake) {
      speed /= 3;
    }
    let turnSpeed;
    if (lean === 0) {
      turnSpeed = TURNING_COEFF;
    } else if ((movement[0] > 0 && lean < 0) || (movement[0] < 0 && lean > 0)) {
      turnSpeed = 1;
    } else {
      turnSpeed = TURNING_COEFF / 2;
    }
    groupRef.current.position.x += movement[0] * turnSpeed;
    groupRef.current.position.y += movement[1] * TURNING_COEFF;
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
    if (groupRef.current.position.z > 1000) {
      resetTargets();
      resetScore();
      groupRef.current.position.z = 0;
    }
    groupRef.current.rotation.z = MathUtils.lerp(
      groupRef.current.rotation.z,
      lean,
      0.2
    );

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

    setTryingToFire(firing);

    camera.position.lerp(offset, 0.12);

    camera.lookAt(target);
  });

  return (
    <>
      <group ref={groupRef}>
        <ShipModel shipRef={shipRef} />
      </group>
      {...Object.values(bullets)}
    </>
  );
}
