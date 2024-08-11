import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Box from "./Box";
import styles from "./R3F.module.scss";
import { useSocket } from "./contexts/SocketContext";

export default function R3F({}) {
  const { cubeTransform } = useSocket();

  return (
    <div className={styles.canvasContainer}>
      <Canvas shadows camera={{ position: [1, 20, 4] }} color="black">
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.1} />
        <directionalLight
          castShadow
          target-position={cubeTransform.position}
          color="white"
          position={[3, 8, 5]}
          shadow-camera-left={-70}
          shadow-camera-bottom={-70}
          shadow-camera-top={70}
          shadow-camera-right={70}
          shadow-camera-far={70}
        />
        <directionalLight
          castShadow
          target-position={cubeTransform.position}
          color="white"
          intensity={0.3}
          position={[1, 10, 5]}
          shadow-camera-left={-70}
          shadow-camera-bottom={-70}
          shadow-camera-top={70}
          shadow-camera-right={70}
          shadow-camera-far={70}
        />
        <directionalLight
          castShadow
          target-position={cubeTransform.position}
          color="yellow"
          position={[2, 3, -5]}
          intensity={0.5}
          shadow-camera-left={-70}
          shadow-camera-bottom={-70}
          shadow-camera-top={70}
          shadow-camera-right={70}
          shadow-camera-far={70}
        />
        <directionalLight
          castShadow
          target-position={cubeTransform.position}
          color="purple"
          position={[-1, 2, -3]}
          intensity={0.8}
          shadow-camera-left={-70}
          shadow-camera-bottom={-70}
          shadow-camera-top={70}
          shadow-camera-right={70}
          shadow-camera-far={70}
        />
        <Box />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1000, 1000]} />
          <shadowMaterial color={"#171717"} transparent opacity={0.4} />
          <meshStandardMaterial color={"#2b2b2b"} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
