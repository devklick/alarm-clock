import { useEffect, useRef, useState } from "react";
import { TimeStruct as TimeStruct } from "../../../stores/alarmStore";

import Num from "../Num";

import styles from "./Time.module.scss";
import Label from "../Label";

interface TimeProps {
  onChanged(time: TimeStruct): void;
  disabled?: boolean;
  label: string;
  hour: number;
  minute: number;
}

function Time({ disabled, label, hour, minute, onChanged }: TimeProps) {
  return (
    <div className={styles["time"]}>
      <Label value={label} />
      <div className={styles["time__input"]}>
        <Num
          initialValue={hour}
          disabled={disabled}
          onChange={(value) => {
            onChanged({ hour: value, minute });
          }}
          pattern="^(0?[0-9]|1[0-9]|2[0-3])$" // ^(?:[01][0-9]|2[0-3])$ // 2[0-3]|[0-1]?[0-9]
        />
        <span>:</span>
        <Num
          initialValue={minute}
          disabled={disabled}
          onChange={(value) => {
            onChanged({ hour, minute: value });
          }}
          pattern="^(0?[0-9]|[1-5][0-9])$" // 5[0-9]|4[0-9]|3[0-9]|2[0-9]|[0-1]?[0-9]
        />
      </div>
    </div>
  );
}

export default Time;
