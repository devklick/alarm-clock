import { useSettings } from "../../stores/settingsStore";
import styles from "./AnalogDisplay.module.scss";
import AnalogHand from "./AnalogHand";
import Numbers from "./Numbers";

function AnalogDisplay() {
  const color = useSettings((s) => s.clockForegroundColor);
  const backgroundColor = useSettings((s) => s.clockBackgroundColor);

  return (
    <div className={styles["analog-display"]} style={{ backgroundColor }}>
      <AnalogHand.Hour />
      <AnalogHand.Minute />
      <AnalogHand.Second />
      <div
        className={styles["analog-display__center"]}
        style={{ backgroundColor: color, boxShadow: `0 0 4px black` }}
      ></div>
      <Numbers />
    </div>
  );
}

export default AnalogDisplay;
