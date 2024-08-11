import R3F from "./R3F";
import DOM from "./DOM";
import SocketProvider from "./contexts/SocketContext";
import "./App.scss";

function App() {
  return (
    <SocketProvider>
      <DOM />
      <R3F />
    </SocketProvider>
  );
}

export default App;
