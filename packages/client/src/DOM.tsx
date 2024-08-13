import { useSocket } from "./contexts/SocketContext";

import styles from "./DOM.module.scss";

export default function DOM() {
  const { isConnected, resetBox, resetSphere } = useSocket();
  return (
    <div className={styles.DOM}>
      <div className={styles.absolute}>
        <p>Socket is {!isConnected ? "not " : ""}connected</p>
        <button
          onClick={(e) => {
            resetSphere();
            e.currentTarget.blur();
          }}
        >
          Reset Sphere
        </button>
        <button
          onClick={(e) => {
            resetBox();
            e.currentTarget.blur();
          }}
        >
          Reset Box
        </button>
      </div>
    </div>
  );
}
