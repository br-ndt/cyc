import { useMemo } from "react";

export default function Lights() {
  const shadowCamera = useMemo(
    () => ({
      castShadow: true,
      "shadow-camera-left": -70,
      "shadow-camera-bottom": -70,
      "shadow-camera-top": 70,
      "shadow-camera-right": 70,
      "shadow-camera-far": 70,
    }),
    []
  );

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[3, 8, 5]} {...shadowCamera} />
      <directionalLight
        color="white"
        intensity={0.3}
        position={[1, 10, 5]}
        {...shadowCamera}
      />
      <directionalLight
        color="yellow"
        position={[2, 3, -5]}
        intensity={0.5}
        {...shadowCamera}
      />
      <directionalLight
        color="purple"
        position={[-1, 2, -3]}
        intensity={0.8}
        {...shadowCamera}
      />
    </>
  );
}
