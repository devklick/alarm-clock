import { useRef } from "react";
import { useSettings } from "../../../stores/settingsStore";
import DigiChar from "../../DigiChar";

import styles from "./SecondaryDisplay.module.scss";
import Tooltip from "../../Tooltip";

function SecondaryDisplay() {
  const meridianRef = useRef<HTMLDivElement>(null);
  const settings = useSettings();

  function handleMeridianClick() {
    settings.toggleHourType();
  }

  return (
    <div className={styles["secondary-display"]}>
      <Tooltip elementRef={meridianRef} value="Toggle 24 hour / 12 hour" />
      <div
        className={styles["secondary-display__meridian-type"]}
        onClick={handleMeridianClick}
        ref={meridianRef}
      >
        <DigiChar.Doubles.MeridianType />
      </div>
      <div className={styles["secondary-display__second"]}>
        <DigiChar.Doubles.Second />
      </div>
    </div>
  );
}

export default SecondaryDisplay;
