import { Body, Box, Plane, Sphere, Vec3, World } from "cannon-es";

import { IWorld } from "../types.js";

export default function createWorld(): IWorld {
  const physics = new World({
    gravity: new Vec3(0, -9.82, 0), // m/s^2
  });

  //create ground
  const plane = new Body({
    type: Body.STATIC,
    shape: new Plane(),
  });
  plane.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up
  physics.addBody(plane);

  //create sphere
  const radius = 1;
  const sphere = new Body({
    angularDamping: 0.9,
    mass: 1,
    position: new Vec3(0, 10, 0),
    shape: new Sphere(radius),
  });
  physics.addBody(sphere);

  //create box
  const box = new Body({
    angularDamping: 0.9,
    mass: 1,
    position: new Vec3(0, 2, 0),
    shape: new Box(new Vec3(1, 1, 1)),
    fixedRotation: false,
  });
  physics.addBody(box);

  return {
    data: {
      physics,
      state: {
        delta: 0.01,
        cube: {
          isHovered: false,
          transform: {
            position: [0, 2, 0],
            rotation: [0, 0, 0],
          },
        },
      },
      timestamp: performance.now(),
      getState: function () {
        return this.state;
      },
      setState: function (newState) {
        this.state = newState;
      },
    },
    getData: function () {
      return this.data;
    },
    setData: function (newData) {
      this.data = newData;
    },
  };
}
