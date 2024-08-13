import { useSphere } from "@react-three/cannon";

import PhysicsShape, { PhysicsShapeProps } from "./PhysicsShape";

export default function Sphere(
  props: Omit<PhysicsShapeProps, "cannonCallback">
) {
  return (
    <PhysicsShape {...props} cannonCallback={useSphere}>
      <meshNormalMaterial />
      <sphereGeometry args={props.args} />
    </PhysicsShape>
  );
}
