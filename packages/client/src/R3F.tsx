import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Debug, Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";

import { useKeyboard } from "./hooks/useKeyboard";
import { useMouse } from "./hooks/useMouse";
import Lights from "./Lights";
import Plane from "./Plane";
import Ship from "./Ship";
import Target from "./Target";

import getInput from "./utils/getInput";
import styles from "./R3F.module.scss";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTargetPosition() {
  return new Vector3(
    getRandomInt(-45, 45),
    getRandomInt(2, 20),
    getRandomInt(5, 500)
  );
}

const targetCount = 30;

export default function R3F({}) {
  const keyboard = useKeyboard();
  const mouse = useMouse();
  const startingTargets = useMemo(
    () =>
      new Array(targetCount).fill(" ").map((_, i) => {
        return (
          <Target
            onRemove={() => {
              onRemoveTarget(i.toString());
            }}
            position={getTargetPosition()}
          />
        );
      }),
    []
  );
  const stateRef = useRef<{ [key: string]: any }>();
  const [targets, setTargets] = useState<{ [key: string]: any }>(
    startingTargets
  );

  stateRef.current = targets;

  const onRemoveTarget = useCallback((id: string) => {
    setTargets({ ...stateRef.current, [id]: null });
  }, []);

  const onResetTargets = useCallback(() => {
    setTargets(startingTargets);
  }, []);

  return (
    <div className={styles.canvasContainer}>
      <Canvas shadows camera={{ position: [0, 9, -4] }} color="black">
        <color attach="background" args={["#000"]} />
        <Lights />
        <Physics>
          <Ship
            input={() => getInput(keyboard, mouse)}
            resetTargets={onResetTargets}
          />
          {...Object.values(targets)}
          <Plane />
        </Physics>
      </Canvas>
    </div>
  );
}
