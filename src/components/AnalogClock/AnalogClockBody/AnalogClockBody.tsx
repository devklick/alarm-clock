import React from "react";
import styles from "./AnalogClockBody.module.scss";
import clsx from "clsx";

interface AnalogClockBodyProps {
  children: React.ReactNode;
}
function AnalogClockBody({ children }: AnalogClockBodyProps) {
  return (
    <div className={styles["analog-clock-body"]}>
      <div className={styles["analog-clock-body__bell-container"]}>
        <div
          className={clsx(
            styles["analog-clock-body__bell"],
            styles["analog-clock-body__bell--left"]
          )}
        />
        <div
          className={clsx(
            styles["analog-clock-body__bell"],
            styles["analog-clock-body__bell--right"]
          )}
        />
      </div>
      <div className={styles["analog-clock-body__frame"]}>
        <div className={styles["analog-clock-body__content"]}>{children}</div>
      </div>
    </div>
  );
}

export default AnalogClockBody;
