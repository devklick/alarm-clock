import { CSSProperties } from "react";
import clsx from "clsx";

import Hour from "./Hour";
import Separator from "./Separator";
import Minute from "./Minute";
import Second from "./Second";
import Millisecond from "./Millisecond";
import MeridianType from "./MeridianType";

import { DigiCharValue, valueCellStates } from "./types";
import { useSettings } from "../../stores/settingsStore";

import styles from "./DigiChar.module.scss";

interface DigiCharProps {
  value: DigiCharValue;
  visibility?: Extract<CSSProperties["visibility"], "visible" | "hidden">;
}

function DigiChar({ value, visibility = "visible" }: DigiCharProps) {
  const { clockForegroundColor } = useSettings();
  return (
    <div className={styles["digi-char"]}>
      {valueCellStates[value].flat().map((active, i) => (
        <span
          key={i}
          className={clsx({
            [styles["digi-char__cell"]]: true,
            [styles["digi-char__cell--active"]]: !!active,
            [styles["digi-char__cell--inactive"]]: !active,
          })}
          style={{
            backgroundColor: clockForegroundColor,
            boxShadow: active
              ? `0px 0px 5px 1px ${clockForegroundColor}`
              : undefined,
            visibility,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Components that render two DigiChars
 */
DigiChar.Doubles = {
  Hour,
  Minute,
  Second,
  MeridianType,
};

/**
 * Components that render one DigiChar
 */
DigiChar.Singles = {
  Separator,
};

/**
 * Components that render three DigiChars
 */
DigiChar.Triples = {
  Millisecond,
};

export default DigiChar;
