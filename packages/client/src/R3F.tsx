import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";

import Lights from "./Lights";
import Plane from "./Plane";
import Ship from "./Ship";
import { useKeyboard } from "./hooks/useKeyboard";
import getInput from "./utils/getInput";

import styles from "./R3F.module.scss";

export default function R3F({}) {
  const keyboard = useKeyboard();
  return (
    <div className={styles.canvasContainer}>
      <Canvas shadows camera={{ position: [0, 9, -4] }} color="black">
        <color attach="background" args={["#000"]} />
        <Lights />
        <Ship input={() => getInput(keyboard)} />
        <Physics>
          <Plane />
        </Physics>
      </Canvas>
    </div>
  );
}
