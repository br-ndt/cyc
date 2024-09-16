import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { Euler, Vector3 } from "three";
import { IWorldState } from "../types";

interface ISocketContext {
  cubeTransform: {
    position: Vector3;
    rotation: Euler;
  };
  isHover: boolean;
  isConnected: boolean;
  physics: any;
  socket: null | Socket;
  resetBox: () => void;
  resetSphere: () => void;
  setHover: (isHover: boolean) => void;
}

interface SocketProviderProps {
  children: ReactNode | ReactNode[];
}

export const SocketContext = createContext<ISocketContext>({
  cubeTransform: {
    position: new Vector3(0, 4, 0),
    rotation: new Euler().setFromVector3(new Vector3(0, 0, 0)),
  },
  isHover: false,
  isConnected: false,
  physics: {},
  socket: null,
  resetBox: () => undefined,
  resetSphere: () => undefined,
  setHover: (isHover) => undefined,
});

const URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

const socket = io(URL);
export default function SocketProvider({ children }: SocketProviderProps) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isHover, setIsHover] = useState(false);
  const [physics, setPhysics] = useState([]);
  const [cubeTransform, setCubeTransform] = useState({
    position: new Vector3(0, 4, 0),
    rotation: new Euler().setFromVector3(new Vector3(0, 0, 0)),
  });

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onWorldState(newState: IWorldState) {
      const transform = newState.cube.transform;
      setCubeTransform({
        position: new Vector3(...transform.position),
        rotation: new Euler().setFromVector3(
          new Vector3(...transform.rotation)
        ),
      });
    }

    function onCubeHover(isHover: boolean) {
      setIsHover(isHover);
    }

    function onPhysics(physics: any) {
      setPhysics(physics);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("worldState", onWorldState);
    socket.on("cubeHover", onCubeHover);
    socket.on("physics", onPhysics);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("worldState", onWorldState);
      socket.off("cubeHover", onCubeHover);
      socket.off("physics", onPhysics);
    };
  }, []);

  const setHover = useCallback(
    (isHover: boolean) => {
      socket.emit("hoverChange", isHover);
    },
    [socket]
  );

  const resetSphere = useCallback(() => {
    socket.emit("resetSphere");
  }, [socket]);

  const resetBox = useCallback(() => {
    socket.emit("resetBox");
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        cubeTransform,
        isConnected,
        isHover,
        physics,
        resetBox,
        resetSphere,
        socket,
        setHover,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  if (!SocketContext) {
    throw new Error("SocketContext must be defined!");
  }
  return useContext(SocketContext);
}
