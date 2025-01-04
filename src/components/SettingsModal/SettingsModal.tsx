import { useRef } from "react";
import clsx from "clsx";

import {
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import {
  AlarmSound,
  alarmSounds,
  useSettings,
} from "../../stores/settingsStore";
import Modal from "../Modal";
import styles from "./SettingsModal.module.scss";
import { useAlarmSoundPlayer } from "../../hooks/audioHooks";
import { HourType, hourTypes } from "../../hooks/timeHooks";

import Tooltip from "../Tooltip";

function AlarmSoundPicker() {
  const { alarmSound, setAlarmSound } = useSettings();
  const { play, stop, isPlaying } = useAlarmSoundPlayer({ autoPlay: false });
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <div
      className={clsx(
        styles["settings-modal__field"],
        styles["alarm-sound-picker"]
      )}
    >
      <Tooltip
        elementRef={labelRef}
        value="The sound that plays when the alarm rings"
      />
      <label ref={labelRef}>Alarm Sound</label>
      <div className={styles["alarm-sound-picker__right"]}>
        <select
          value={alarmSound}
          onChange={(selected) =>
            setAlarmSound(selected.currentTarget.value as AlarmSound)
          }
        >
          {alarmSounds.map((sound) => (
            <option value={sound}>{sound}</option>
          ))}
        </select>
        {isPlaying && <IconPlayerStopFilled onClick={stop} />}
        {!isPlaying && <IconPlayerPlayFilled onClick={play} />}
      </div>
    </div>
  );
}

interface ColorPickerProps {
  title: string;
  onChange(value: string): void;
  current: string;
  description: string;
}
function ColorPicker({
  onChange,
  title,
  current,
  description,
}: ColorPickerProps) {
  const labelRef = useRef<HTMLLabelElement>(null);
  return (
    <div
      className={clsx(styles["settings-modal__field"], styles["color-picker"])}
    >
      <Tooltip elementRef={labelRef} value={description} />
      <label ref={labelRef} className={styles["color-picker__label"]}>
        {title}
      </label>
      <input
        type="color"
        className={styles["color-picker__input"]}
        defaultValue={current}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}

interface HourTypePickerProps {
  current: HourType;
  onChange(hourType: HourType): void;
}
function HourTypePicker({ current, onChange }: HourTypePickerProps) {
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <div
      className={clsx(
        styles["settings-modal__field"],
        styles["hour-type-picker"]
      )}
    >
      <Tooltip
        elementRef={labelRef}
        value="The format the clock time is shown in"
      />
      <label ref={labelRef} className={styles["hour-type-picker__label"]}>
        Clock Type
      </label>
      <select
        className="hour-type-picker__select"
        defaultValue={current}
        onChange={(e) => onChange(e.currentTarget.value as HourType)}
      >
        {hourTypes.map((type) => (
          <option value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
}

function SettingsModal() {
  const {
    setClockBackgroundColor,
    setClockForegroundColor,
    clockForegroundColor,
    clockBackgroundColor,
    hourType,
    setHourType,
    closeModal,
  } = useSettings();
  return (
    <Modal
      className={styles["settings-modal"]}
      onEscKey={closeModal}
      onCloseButtonClicked={closeModal}
    >
      <h1>Settings</h1>
      <AlarmSoundPicker />
      <HourTypePicker current={hourType} onChange={setHourType} />
      <ColorPicker
        onChange={setClockBackgroundColor}
        title="Clock Background Color"
        current={clockBackgroundColor}
        description="The color surrounding the clocks LED characters, or unlit characters"
      />
      <ColorPicker
        onChange={setClockForegroundColor}
        title="Clock Foreground Color"
        current={clockForegroundColor}
        description="The color of the clocks LED characters"
      />

      {/* <Button.Primary
        className={styles["settings-modal__ok"]}
        onClick={closeModal}
      >
        <IconCheck color="white" />
      </Button.Primary> */}
    </Modal>
  );
}

export default SettingsModal;
