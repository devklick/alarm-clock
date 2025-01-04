import { useEffect } from "react";
import { useAlarmSoundPlayer } from "../../hooks/audioHooks";
import { useAlarms } from "../../stores/alarmStore";
import styles from "./RingAlert.module.scss";
import {
  IconAlarmMinus,
  IconAlarmSnooze,
  IconBellRinging,
} from "@tabler/icons-react";
import Modal from "../Modal";

interface RingAlertProps {
  alarmId: string;
  onSnoozed(): void;
  onStopped(): void;
}

function RingAlert({ alarmId, onSnoozed, onStopped }: RingAlertProps) {
  const { alarms } = useAlarms();
  const alarm = alarms.find((a) => a.id === alarmId) ?? { label: "test alarm" };
  const alarmSound = useAlarmSoundPlayer();

  // ring alert only rendered when the alarm is due to sound,
  // so lets play the sound on mount and stop it on unmount.
  useEffect(() => {
    alarmSound.play();

    return () => {
      alarmSound.stop();
    };
  }, [alarmSound]);

  function stopAlarm() {
    alarmSound.stop();
    onStopped();
  }

  function snoozeAlarm() {
    alarmSound.stop();
    onSnoozed();
  }

  return (
    <Modal>
      <span>{alarm.label}</span>
      <IconBellRinging className={styles["alarm-icon"]} />
      <div className={styles["buttons"]}>
        <button className={styles["alarm-action"]} onClick={stopAlarm}>
          <span>Stop</span>
          <IconAlarmMinus />
        </button>
        <button className={styles["alarm-action"]} onClick={snoozeAlarm}>
          <span>Sleep</span>
          <IconAlarmSnooze />
        </button>
      </div>
    </Modal>
  );
}

export default RingAlert;
