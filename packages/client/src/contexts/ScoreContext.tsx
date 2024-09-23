import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface IScoreContext {
  incrementScore: () => void;
  resetScore: () => void;
  score: number;
}

interface ScoreProviderProps {
  children: ReactNode | ReactNode[];
}

export const ScoreContext = createContext<IScoreContext>({
  incrementScore: () => null,
  resetScore: () => null,
  score: 0,
});

export default function ScoreProvider({ children }: ScoreProviderProps) {
  const [score, setScore] = useState<number>(0);
  const stateRef = useRef<number>(0);

  stateRef.current = score;

  const incrementScore = useCallback(() => {
    setScore(stateRef.current + 1);
  }, []);

  const resetScore = useCallback(() => {
    setScore(0);
  }, []);

  return (
    <ScoreContext.Provider
      value={{
        incrementScore,
        resetScore,
        score,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  if (!ScoreContext) {
    throw new Error("ScoreContext must be defined!");
  }
  return useContext(ScoreContext);
}
