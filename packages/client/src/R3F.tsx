import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { useSocket } from "./contexts/SocketContext";
import Box from "./Box";
import Plane from "./Plane";
import Sphere from "./Sphere";
import Lights from "./Lights";

import styles from "./R3F.module.scss";
import StaticBox from "./StaticBox";
import { createQuad, createTriplet } from "./utils/helpers";

export default function R3F({}) {
  const { physics } = useSocket();

  return (
    <div className={styles.canvasContainer}>
      <Canvas shadows camera={{ position: [1, 20, 4] }} color="black">
        <color attach="background" args={["#000"]} />
        <Lights />
        <StaticBox />
        <Physics>
          <Plane />
          {physics[2] && (
            <Box
              args={[2, 2, 2]}
              angularVelocity={createTriplet(physics[2].angularVelocity)}
              position={createTriplet(physics[2].position)}
              quaternion={createQuad(physics[2].quaternion)}
              velocity={createTriplet(physics[2].velocity)}
            />
          )}
          {physics[1] && (
            <Sphere
              args={[1]}
              angularVelocity={createTriplet(physics[1].angularVelocity)}
              position={createTriplet(physics[1].position)}
              quaternion={createQuad(physics[1].quaternion)}
              velocity={createTriplet(physics[1].velocity)}
            />
          )}
        </Physics>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
