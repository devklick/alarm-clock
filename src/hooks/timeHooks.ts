import { useEffect, useState } from "react";

const dateParts = [
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond",
] as const;
export type DatePart = (typeof dateParts)[number];

export const hourTypes = ["12", "24"] as const;
export type HourType = (typeof hourTypes)[number];
type MeridianType = "AM" | "PM";

export function isDatePart(value: unknown): value is DatePart {
  return dateParts.includes(value as DatePart);
}

type DateGetterKey<T> = {
  [K in keyof T]: T[K] extends () => number ? K : never;
}[keyof T];

const datePartGetters: Record<DatePart, DateGetterKey<Date>> = {
  day: "getDate",
  hour: "getHours",
  millisecond: "getMilliseconds",
  minute: "getMinutes",
  month: "getMonth",
  second: "getSeconds",
  year: "getFullYear",
};

function useGetCurrentDatePart(part: DatePart): [number] {
  const [value, setValue] = useState(new Date()[datePartGetters[part]]());

  useEffect(() => {
    const i = setInterval(() => {
      const newValue = new Date()[datePartGetters[part]]();
      setValue((currentValue) => {
        if (currentValue !== newValue) {
          return newValue;
        }
        return currentValue;
      });
    }, 1);
    return () => clearInterval(i);
  }, [part]);

  return [value] as const;
}

export function useCurrentMillisecond() {
  return useGetCurrentDatePart("millisecond");
}

export function useCurrentSecond() {
  return useGetCurrentDatePart("second");
}

export function useCurrentMinute() {
  return useGetCurrentDatePart("minute");
}

export function useCurrentHour(hourType: HourType = "12"): [number] {
  const [hour] = useGetCurrentDatePart("hour");
  return [hourType === "24" ? hour : hour % 12 || 0] as const;
}

export function useCurrentDay() {
  return useGetCurrentDatePart("day");
}

export function useCurrentMonth() {
  return useGetCurrentDatePart("month");
}

export function useCurrentYear() {
  return useGetCurrentDatePart("year");
}

export function useMeridianType(): [MeridianType] {
  const [hour] = useCurrentHour("24");
  return [hour > 12 ? "PM" : "AM"] as const;
}
