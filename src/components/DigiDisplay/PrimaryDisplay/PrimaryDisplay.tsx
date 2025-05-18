import styles from "./PrimaryDisplay.module.scss";

import DigiChar from "../../DigiChar";

function PrimaryDisplay() {
  return (
    <div className={styles["primary-display"]}>
      <DigiChar.Doubles.Hour />
      <DigiChar.Singles.Separator />
      <DigiChar.Doubles.Minute />
    </div>
  );
}

export default PrimaryDisplay;
