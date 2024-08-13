import { Api, Quad, Triplet } from "@react-three/cannon";
import { DependencyList, ReactNode, Ref, useMemo, useRef } from "react";
import { Euler, Mesh, Object3D, Quaternion } from "three";

export interface PhysicsShapeProps {
  angularVelocity?: Triplet;
  args?: [number] | [number, number, number];
  children?: ReactNode[];
  cannonCallback: <O extends Object3D>(
    fn: (index: number) => any,
    fwdRef?: Ref<O> | undefined,
    deps?: DependencyList | undefined
  ) => Api<O>;
  mass?: number;
  position?: any;
  quaternion?: Quad;
  velocity?: Triplet;
}

export default function PhysicsShape({
  angularVelocity = undefined,
  args = undefined,
  cannonCallback,
  children,
  mass = 1,
  position = undefined,
  quaternion = undefined,
  velocity = undefined,
}: PhysicsShapeProps) {
  const fwdRef = useRef<Mesh>(null);
  const rotation = useMemo<Triplet | undefined>(() => {
    if (quaternion) {
      const euler = new Euler().setFromQuaternion(
        new Quaternion(
          quaternion[0],
          quaternion[1],
          quaternion[2],
          quaternion[3]
        )
      );
      return [euler.x, euler.y, euler.z];
    }
  }, [quaternion]);

  const [ref] = cannonCallback(
    () => ({
      angularVelocity,
      args,
      mass,
      position,
      rotation,
      velocity,
    }),
    fwdRef,
    [angularVelocity, position, quaternion, rotation, velocity]
  );

  return (
    <mesh ref={ref} castShadow>
      {children}
    </mesh>
  );
}
