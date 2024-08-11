import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { Euler, Vector3 } from "three";

interface ISocketContext {
  cubeTransform: {
    position: Vector3;
    rotation: Euler;
  };
  isConnected: boolean;
  socket: null | Socket;
}

interface SocketProviderProps {
  children: ReactNode[];
}

export const SocketContext = createContext<ISocketContext>({
  cubeTransform: {
    position: new Vector3(0, 4, 0),
    rotation: new Euler().setFromVector3(new Vector3(0, 0, 0)),
  },
  isConnected: false,
  socket: null,
});

const URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

const socket = io(URL);
export default function SocketProvider({ children }: SocketProviderProps) {
  const [isConnected, setIsConnected] = useState(socket.connected);
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

    function onCubeTransform(newTransform: any) {
      setCubeTransform({
        position: new Vector3(...newTransform.position),
        rotation: new Euler().setFromVector3(
          new Vector3(...newTransform.rotation)
        ),
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("cubeTransform", onCubeTransform);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("cubeTransform", onCubeTransform);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ cubeTransform, isConnected, socket }}>
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
