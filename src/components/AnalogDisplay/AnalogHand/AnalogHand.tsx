import clsx from "clsx";
import { DatePart, useGetCurrentDatePart } from "../../../hooks/timeHooks";
import styles from "./AnalogHand.module.scss";
import { useSettings } from "../../../stores/settingsStore";

type TimePart = Extract<DatePart, "hour" | "minute" | "second">;

interface AnalogHandProps {
  type: TimePart;
}

function AnalogHand({ type }: AnalogHandProps) {
  const [millisecond] = useGetCurrentDatePart(type);
  const color = useSettings((s) => s.clockForegroundColor);
  const rotation = calcRotation(type, millisecond);

  return (
    <div className={styles["analog-hand__container"]}>
      <div
        className={clsx(styles["analog-hand"], styles[`analog-hand--${type}`])}
        style={{ transform: `rotate(${rotation}deg)`, backgroundColor: color }}
      ></div>
    </div>
  );
}

AnalogHand.Hour = () => <AnalogHand type="hour" />;
AnalogHand.Minute = () => <AnalogHand type="minute" />;
AnalogHand.Second = () => <AnalogHand type="second" />;

function calcRotation(type: TimePart, value: number): number {
  switch (type) {
    case "hour":
      return (360 / 12) * value;
    case "minute":
    case "second":
      return (360 / 60) * value;
  }
}

export default AnalogHand;
