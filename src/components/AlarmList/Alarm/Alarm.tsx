import { useEffect, useState } from "react";
import {
  AlarmConfig,
  newAlarmConfig,
  TimeStruct,
} from "../../../stores/alarmStore";
import styles from "./Alarm.module.scss";
import Switch from "../../Input/Switch";
import DayPicker from "../../Input/DayPicker";
import Time from "../../Input/Time";
import Button from "../../Input/Button";
import Num from "../../Input/Num";
import TextBox from "../../Input/TextBox";
import clsx from "clsx";
import useAlarm from "./hooks/useAlarm";
import {
  IconAlarmMinus,
  IconDeviceFloppy,
  IconPencil,
  IconX,
} from "@tabler/icons-react";

interface AlarmProps {
  config?: AlarmConfig;
  onSubmit(alarmConfig: AlarmConfig): void;
  onCancel?(): void;
  onDelete?(): void;
  setIsEditing?(editing: boolean): void;
  canEdit?: boolean;
  onRinging?(): void;
  hitSnooze?: boolean;
  onSnoozed?(): void;
  hitStop?: boolean;
  onStopped?(): void;
}

function Alarm({
  onSubmit,
  onCancel,
  setIsEditing,
  onDelete,
  canEdit,
  config: _config,
  hitSnooze,
  hitStop,
  onSnoozed,
  onStopped,
  onRinging,
}: AlarmProps) {
  const [action, setAction] = useState<"view" | "add" | "edit">(
    _config?.id ? "view" : "add"
  );
  const [config, setConfig] = useState<AlarmConfig>({
    ...newAlarmConfig(),
    ..._config,
  });
  const { snooze, stop } = useAlarm({
    config,
    onRinging: onRinging ?? (() => null),
    onAutoSnoozed: onSnoozed ?? (() => null),
  });

  useEffect(() => {
    if (hitSnooze) {
      snooze();
      onSnoozed?.();
    }
  }, [hitSnooze, onSnoozed, snooze]);

  useEffect(() => {
    if (hitStop) {
      stop();
      onStopped?.();
    }
  }, [hitStop, stop, onStopped]);

  const edit = action === "edit";
  const add = action === "add";
  const view = action === "view";
  const disabled = view;

  function onTimeChanged(time: TimeStruct) {
    setConfig((c) => ({ ...c, time }));
  }

  function handleEnabledChanged(enabled: boolean) {
    setConfig((c) => ({ ...c, enabled }));
  }

  function handleLabelChanged(label: string) {
    setConfig((c) => ({ ...c, label: label ?? undefined }));
  }

  function handleSnoozeDurationChanged(snoozeDuration: number) {
    setConfig((c) => ({ ...c, snoozeDuration }));
  }

  function handleCancelClicked() {
    if (action === "edit") {
      if (_config) setConfig({ ..._config });
      setIsEditing?.(false);
      setAction("view");
    } else {
      onCancel?.();
    }
  }

  function handleSaveClicked() {
    if (add || edit) {
      onSubmit(config);
      setIsEditing?.(false);
      setAction("view");
    }
  }

  function handleEditClicked() {
    setIsEditing?.(true);
    setAction("edit");
  }

  return (
    <div
      className={clsx({
        [styles["alarm"]]: true,
        [styles["alarm--disabled"]]: !config.enabled,
      })}
    >
      <div className={styles["alarm__mid"]}>
        <div className={styles["alarm__mid-row"]}>
          <Switch checked={config.enabled} onChanged={handleEnabledChanged} />
          <TextBox
            label="Label"
            onChange={handleLabelChanged}
            value={config.label}
            disabled={disabled}
          />
        </div>
        <div className={styles["alarm__mid-row"]}>
          <Time
            hour={config.time.hour}
            minute={config.time.minute}
            onChanged={onTimeChanged}
            disabled={disabled}
            label="Time"
          />
          <DayPicker
            multiple
            disabled={disabled}
            selected={config.repeat}
            onChange={(repeat) => setConfig((c) => ({ ...c, repeat }))}
            label="Repeat"
          />
          <div className={styles["alarm__snooze-duration"]}>
            <Num
              initialValue={config.snoozeDuration}
              pattern="^(0?[0-9]|[1-5][0-9])$"
              disabled={disabled}
              onChange={handleSnoozeDurationChanged}
              label="Snooze"
            />
          </div>
        </div>
      </div>
      <div className={styles["alarm__right"]}>
        {(add || edit) && (
          <>
            <Button.Secondary label="Cancel" onClick={handleCancelClicked}>
              <IconX color="white" />
            </Button.Secondary>
            <Button.Primary label="Save" onClick={handleSaveClicked}>
              <IconDeviceFloppy color="white" />
            </Button.Primary>
          </>
        )}
        {view && (
          <>
            <Button.Danger label="Delete (hold)" onClick={onDelete}>
              <IconAlarmMinus color="white" />
            </Button.Danger>
            <Button.Secondary
              label="Edit"
              onClick={handleEditClicked}
              disabled={!canEdit}
            >
              <IconPencil color="white" />
            </Button.Secondary>
          </>
        )}
      </div>
    </div>
  );
}

export default Alarm;
