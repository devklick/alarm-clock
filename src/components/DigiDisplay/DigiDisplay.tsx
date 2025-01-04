import PrimaryDisplay from "./PrimaryDisplay";
import SecondaryDisplay from "./SecondaryDisplay";
import { useSettings } from "../../stores/settingsStore";
import { getLightest } from "../../utils/colorUtils";

import styles from "./DigiDisplay.module.scss";

function DigiDisplay() {
  const { clockBackgroundColor, clockForegroundColor } = useSettings();
  const highlight = getLightest(clockBackgroundColor, clockForegroundColor);

  return (
    <div className={styles["digi-display"]}>
      <div
        className={styles["digi-display__grid"]}
        style={{
          backgroundColor: clockBackgroundColor,
          boxShadow: `2px 2px 5px 1px ${highlight}, -2px -2px 5px 2px black`,
        }}
      >
        <PrimaryDisplay />
        <SecondaryDisplay />
      </div>
    </div>
  );
}

export default DigiDisplay;
