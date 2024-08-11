import { useSocket } from "./contexts/SocketContext";

import styles from "./DOM.module.scss";

export default function DOM() {
  const { isConnected } = useSocket();
  return (
    <div className={styles.DOM}>
      <div className={styles.absolute}>
        <p>Socket is {!isConnected ? "not " : ""}connected</p>
      </div>
    </div>
  );
}
