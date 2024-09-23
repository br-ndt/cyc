import R3F from "./R3F";
import DOM from "./DOM";
import SocketProvider from "./contexts/SocketContext";
import "./App.scss";
import ScoreProvider from "./contexts/ScoreContext";

function App() {
  return (
    <ScoreProvider>
      <DOM />
      <R3F />
    </ScoreProvider>
  );
}

export default App;
