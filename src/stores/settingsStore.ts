import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HourType } from "../hooks/timeHooks";

export const alarmSounds = [
  "Bird Song",
  "Descending",
  "Dotty",
  "Mana",
  "Melodic",
  "Mystery",
  "Nightmare",
  "Repeating Note",
  "Resolved",
  "Rock Up",
  "Simple",
  "Techno",
  "Upbeat",
  "Vamperial Waltz",
] as const;

export type AlarmSound = (typeof alarmSounds)[number];

type ModalType = "info" | "settings";

interface SettingsState {
  clockForegroundColor: string;
  clockBackgroundColor: string;
  hourType: HourType;
  setClockForegroundColor(color: string): void;
  setClockBackgroundColor(color: string): void;
  setHourType(hourType: HourType): void;
  toggleHourType(): void;
  alarmSound: AlarmSound;
  setAlarmSound(alarmSound: AlarmSound): void;
  modalType?: ModalType;
  openModal(modal: ModalType): void;
  closeModal(): void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      clockForegroundColor: "#fbff00",
      clockBackgroundColor: "#333333",
      hourType: "24",
      alarmSound: "Simple",
      modalType: undefined,
      openModal(modalType) {
        set({ modalType });
      },
      closeModal() {
        set({ modalType: undefined });
      },
      setAlarmSound(alarmSound) {
        set({ alarmSound });
      },
      setClockForegroundColor(color) {
        set({ clockForegroundColor: color });
      },
      setClockBackgroundColor(color) {
        set({ clockBackgroundColor: color });
      },
      setHourType(hourType) {
        set({ hourType });
      },
      toggleHourType() {
        set((settings) => {
          return { hourType: settings.hourType === "12" ? "24" : "12" };
        });
      },
    }),
    {
      name: "alarm-clock-settings",
      partialize: ({ modalType: _, ...rest }) => rest,
    }
  )
);
