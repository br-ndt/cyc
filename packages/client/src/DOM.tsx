import { useScore } from "./contexts/ScoreContext";
import { useSocket } from "./contexts/SocketContext";

import styles from "./DOM.module.scss";

export default function DOM() {
  const { isConnected } = useSocket();
  const { score } = useScore();
  return (
    <div className={styles.DOM}>
      <div className={styles.absolute}>
        <p>Socket is {!isConnected ? "not " : ""}connected</p>
        <p style={{ color: "white" }}>Score: {score}</p>
      </div>
    </div>
  );
}
