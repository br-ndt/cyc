import { useGLTF } from "@react-three/drei";

export function ShipModel(props) {
  const { nodes, materials } = useGLTF("/pinkship.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Extrude_01CE73D8.geometry}
        material={materials.WorldGridMaterial}
        rotation={[-Math.PI, 0, 0]}
        scale={0.01}
      />
    </group>
  )
}

useGLTF.preload("/pinkship.glb");
