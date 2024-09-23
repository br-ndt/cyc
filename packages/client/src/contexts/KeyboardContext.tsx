import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";

interface IKeyboardContext {
  boost: boolean;
  brake: boolean;
  firing: boolean;
  movement: [x: number, y: number];
}

export interface KeyboardMemo {
  [key: string]: boolean;
}

interface KeyboardProviderProps {
  children: ReactNode[];
}

export const KeyboardContext = createContext<IKeyboardContext>({
  boost: false,
  brake: false,
  firing: false,
  movement: [0, 0],
});

export default function KeyboardProvider({ children }: KeyboardProviderProps) {
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

  const movement: [x: number, y: number] = [0, 0];
  const boost = keyboard["Shift"] ?? false;
  const brake = keyboard["q"] ?? false;
  const firing = keyboard[" "] ?? false;
  // Checking keyboard inputs to determine movement direction
  if (keyboard["s"]) movement[1] -= 0.5; // Move down
  if (keyboard["w"]) movement[1] += 0.5; // Move up
  if (keyboard["d"]) movement[0] -= 0.5; // Move right
  if (keyboard["a"]) movement[0] += 0.5; // Move left

  return (
    <KeyboardContext.Provider
      value={{
        boost,
        brake,
        firing,
        movement,
      }}
    >
      {children}
    </KeyboardContext.Provider>
  );
}

export function useKeyboard() {
  if (!KeyboardContext) {
    throw new Error("KeyboardContext must be defined!");
  }
  return useContext(KeyboardContext);
}
