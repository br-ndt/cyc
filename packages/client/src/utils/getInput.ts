import { KeyboardMemo } from "../hooks/useKeyboard";
import { MouseMemo } from "../hooks/useMouse";

export default function getInput(keyboard: KeyboardMemo, mouse: MouseMemo) {
  let [x, y, z] = [0, 0, 0];
  let lean = 0;
  const boost = keyboard["Shift"] ?? false;
  const brake = keyboard[" "] ?? false;
  const firing = mouse[0] ?? false;
  // Checking keyboard inputs to determine movement direction
  if (keyboard["s"]) y -= 0.5; // Move down
  if (keyboard["w"]) y += 0.5; // Move up
  if (keyboard["d"]) x -= 0.5; // Move right
  if (keyboard["a"]) x += 0.5; // Move left

  // Checking keyboard inputs to determine lean direction
  if (keyboard["q"]) lean -= Math.PI / 2; // Lean left
  if (keyboard["e"]) lean += Math.PI / 2; // Lean right

  // Returning an object with the movement and lean directions, and boost, firing, and brake bools
  return {
    boost,
    brake,
    firing,
    lean,
    movement: [x, y, z],
  };
}
