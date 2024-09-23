import { useMemo, useEffect } from "react"; // Import necessary hooks from the React library

export interface MouseMemo {
  [button: number]: boolean;
}

export function useMouse() {
  // Create a memoized object to store mouse state
  const mouse = useMemo<MouseMemo>(() => ({}), []);
  // Set the corresponding button in the mouse object to true when pressed
  const mousedown = (e: MouseEvent) => {
    mouse[e.button] = true;
  };

  // Set the corresponding button in the mouse object to false when released
  const mouseup = (e: MouseEvent) => {
    mouse[e.button] = false;
  };

  useEffect(() => {
    // Add event listeners for mousedown and mouseup events
    document.addEventListener("mousedown", mousedown);
    document.addEventListener("mouseup", mouseup);

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousedown", mousedown);
      document.removeEventListener("mouseup", mouseup);
    };
  });

  return mouse;
}
