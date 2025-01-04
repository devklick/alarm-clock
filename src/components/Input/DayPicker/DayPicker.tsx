import clsx from "clsx";

import Label from "../Label";
import { DayOfWeek, daysOfWeek } from "../../../stores/alarmStore";

import styles from "./DayPicker.module.scss";

interface DayPickerBaseProps {
  disabled?: boolean;
  selected: unknown;
  onChange(selected: unknown): void;
  label: string;
}

interface SingleSelectProps extends DayPickerBaseProps {
  multiple?: false;
  selected: DayOfWeek;
  onChange(selected: DayOfWeek): void;
}

interface MultiSelectProps extends DayPickerBaseProps {
  multiple: true;
  selected: Array<DayOfWeek>;
  onChange(selected: Array<DayOfWeek>): void;
}

type DayPickerProps = SingleSelectProps | MultiSelectProps;

function DayPicker({
  multiple,
  onChange,
  selected,
  disabled = false,
  label,
}: DayPickerProps): React.ReactNode {
  function isSelected(day: DayOfWeek) {
    return Array.isArray(selected) ? selected.includes(day) : selected === day;
  }

  function toggleDay(day: DayOfWeek) {
    if (multiple) {
      const newSelected = [...selected];
      const i = newSelected.findIndex((r) => r === day);
      if (i < 0) newSelected.push(day);
      else newSelected.splice(i, 1);
      onChange(newSelected);
    } else {
      onChange(day);
    }
  }

  function renderDay(day: DayOfWeek, index: number) {
    return (
      <li key={index} className={styles["day-picker__day"]}>
        <button
          className={clsx({
            [styles["day-picker__day-button"]]: true,
            [styles["day-picker__day-button--selected"]]: isSelected(day),
          })}
          onClick={() => toggleDay(day)}
          disabled={disabled}
        >
          {day.toUpperCase().substring(0, 3)}
        </button>
      </li>
    );
  }

  return (
    <div className={styles["day-picker"]}>
      <Label value={label} />
      <ul className={styles["day-picker__days"]}>
        {daysOfWeek.map(renderDay)}
      </ul>
    </div>
  );
}

export default DayPicker;
