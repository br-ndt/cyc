import { useMemo, useEffect } from "react"; // Import necessary hooks from the React library

export interface KeyboardMemo {
  [key: string]: boolean;
}

export function useKeyboard() {
  // Create a memoized object to store keyboard state
  const keyboard = useMemo<KeyboardMemo>(() => ({}), []);
  // Set the corresponding key in the keyboard object to true when pressed
  const keydown = (e: KeyboardEvent) => {
    keyboard[e.key !== "Shift" ? e.key.toLocaleLowerCase() : e.key] = true;
  };

  // Set the corresponding key in the keyboard object to false when released
  const keyup = (e: KeyboardEvent) => {
    keyboard[e.key !== "Shift" ? e.key.toLocaleLowerCase() : e.key] = false;
  };

  useEffect(() => {
    // Add event listeners for keydown and keyup events
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("keyup", keyup);
    };
  });

  return keyboard;
}
