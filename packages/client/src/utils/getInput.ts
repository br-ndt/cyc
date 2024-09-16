import { KeyboardMemo } from "../hooks/useKeyboard";

export default function getInput(keyboard: KeyboardMemo) {
  let [x, y, z] = [0, 0, 0];
  const boost = keyboard["Shift"] ?? false;
  const brake = keyboard["q"] ?? false;
  // Checking keyboard inputs to determine movement direction
  if (keyboard["s"]) y -= 0.5; // Move down
  if (keyboard["w"]) y += 0.5; // Move up
  if (keyboard["d"]) x -= 0.5; // Move right
  if (keyboard["a"]) x += 0.5; // Move left

  // Returning an object with the movement and look direction
  return {
    boost,
    brake,
    movement: [x, y, z],
  };
}
