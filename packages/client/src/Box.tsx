import { useBox } from "@react-three/cannon";

import PhysicsShape, { PhysicsShapeProps } from "./PhysicsShape";

export default function Box(props: Omit<PhysicsShapeProps, "cannonCallback">) {
  return (
    <PhysicsShape {...props} cannonCallback={useBox}>
      <boxGeometry args={props.args} />
      <meshStandardMaterial color={"#2b2b2b"} />
    </PhysicsShape>
  );
}
