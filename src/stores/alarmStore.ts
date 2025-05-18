import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist } from "zustand/middleware";

export const dayOfWeek = {
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
  sunday: "sunday",
} as const;

export const daysOfWeek = Object.values(dayOfWeek);

export type DayOfWeek = (typeof dayOfWeek)[keyof typeof dayOfWeek];
export interface TimeStruct {
  hour: number;
  minute: number;
}
export function isTimeStruct(value: unknown): value is TimeStruct {
  const timeStruct = value as TimeStruct;
  return timeStruct?.hour !== undefined && timeStruct?.minute !== undefined;
}

export interface AlarmConfig {
  id: string;
  time: TimeStruct;
  enabled: boolean;
  label?: string;
  repeat: Array<DayOfWeek>;
  snoozeDuration: number;
}

const constAlarmConfigDefaults = {
  enabled: true,
  repeat: Array<DayOfWeek>(),
  snoozeDuration: 10,
  snoozedUntil: undefined,
};

export function newAlarmConfig(): AlarmConfig {
  const now = new Date();

  return {
    ...constAlarmConfigDefaults,
    id: uuid(),
    time: { hour: now.getHours(), minute: now.getMinutes() },
  };
}

interface AlarmsState {
  alarms: Array<AlarmConfig>;
  addAlarm(alarm: Partial<AlarmConfig>): string;
  editAlarm(alarm: AlarmConfig): void;
  toggleAlarmEnabled(id: string): void;
  deleteAlarm(id: string): void;
  duplicateAlarm(id: string): string | undefined;
}

export const useAlarms = create<AlarmsState>()(
  persist(
    (set) => ({
      alarms: [],
      addAlarm(alarm) {
        const alarmValues = { ...newAlarmConfig(), ...alarm };
        set((state) => ({
          alarms: [...state.alarms, alarmValues],
        }));
        return alarmValues.id;
      },
      deleteAlarm(id) {
        set((state) => ({ alarms: state.alarms.filter((a) => a.id !== id) }));
      },
      duplicateAlarm(id) {
        let newId: string | undefined;
        set((state) => {
          const index = state.alarms.findIndex((a) => a.id === id);
          if (index < 0) return {};
          newId = uuid();
          const alarms = [...state.alarms];
          alarms.push({ ...alarms[index], id: newId });
          return { alarms };
        });
        return newId;
      },
      editAlarm(alarm: AlarmConfig) {
        set((state) => {
          const index = state.alarms.findIndex((a) => a.id === alarm.id);
          if (index < 0) return {};
          const alarms = [...state.alarms];
          alarms[index].label = alarm.label;
          alarms[index].enabled = alarm.enabled;
          alarms[index].repeat = alarm.repeat;
          alarms[index].snoozeDuration = alarm.snoozeDuration;
          alarms[index].time = alarm.time;
          return { alarms };
        });
      },
      toggleAlarmEnabled(id) {
        set((state) => {
          const index = state.alarms.findIndex((a) => a.id === id);
          if (index < 0) return {};
          const alarms = [...state.alarms];
          alarms[index].enabled = !alarms[index].enabled;
          return { alarms };
        });
      },
    }),
    {
      name: "alarms",
    }
  )
);
