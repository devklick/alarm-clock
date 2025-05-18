import { useState } from "react";
import { IconAlarmPlus } from "@tabler/icons-react";

import Alarm from "./Alarm/Alarm";
import RingAlert from "../RingAlert";
import Button from "../Input/Button";
import { useAlarms } from "../../stores/alarmStore";

import styles from "./AlarmList.module.scss";

type AlarmListState = "viewing" | "adding" | "editing";
function AlarmList() {
  const [listState, setListState] = useState<AlarmListState>("viewing");

  const [alarmRinging, setAlarmRinging] = useState<string | null>(null);
  const [alarmAction, _setAlarmAction] = useState<"stop" | "snooze" | null>(
    null
  );

  const { alarms, editAlarm, addAlarm, deleteAlarm } = useAlarms();

  const setViewing = () => setListState("viewing");
  const setAdding = () => setListState("adding");
  const setEditing = () => setListState("editing");

  const canAddAlarm = listState === "viewing";
  const adding = listState === "adding";

  function setAlarmAction(action: "stop" | "snooze" | null) {
    setAlarmRinging(null);
    _setAlarmAction(action);
  }

  return (
    <>
      <div className={styles["alarm-list"]}>
        <div className={styles["alarm-list-actions"]}>
          {import.meta.env.DEV && (
            <button onClick={() => setAlarmRinging("ringing")}>
              Test Alarm
            </button>
          )}
          <Button.Primary
            label="Add Alarm"
            onClick={setAdding}
            disabled={!canAddAlarm}
          >
            <IconAlarmPlus color="white" />
          </Button.Primary>
        </div>
        {/* This probably should not be part of the alarm list */}
        {alarmRinging && (
          <RingAlert
            alarmId={alarmRinging}
            onSnoozed={() => setAlarmAction("snooze")}
            onStopped={() => setAlarmAction("stop")}
          />
        )}

        <div className={styles["alarm-list-content"]}>
          {adding && (
            <Alarm
              onSubmit={(newAlarm) => addAlarm(newAlarm) && setViewing()}
              onCancel={() => setViewing()}
            />
          )}
          {alarms.map((alarm) => (
            <Alarm
              config={alarm}
              onSubmit={editAlarm}
              setIsEditing={(editing) =>
                editing ? setEditing() : setViewing()
              }
              canEdit={!adding}
              onDelete={() => deleteAlarm(alarm.id)}
              onRinging={() => setAlarmRinging(alarm.id)}
              hitSnooze={alarmAction === "snooze"}
              hitStop={alarmAction === "stop"}
              onSnoozed={() => setAlarmAction(null)}
              onStopped={() => setAlarmAction(null)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default AlarmList;
