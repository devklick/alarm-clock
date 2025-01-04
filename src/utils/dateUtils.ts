import { DayOfWeek, daysOfWeek } from "../stores/alarmStore";

export function getNextDay(
  currentDay: DayOfWeek,
  days: DayOfWeek[] = daysOfWeek
): DayOfWeek {
  const currentIndex = daysOfWeek.indexOf(currentDay);

  const sortedDays = days.sort(
    (a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)
  );

  // Find the next day in the sorted array
  for (const day of sortedDays) {
    if (daysOfWeek.indexOf(day) > currentIndex) {
      return day;
    }
  }

  // If no next day is found, return the first day in the sorted array (wrap-around)
  return sortedDays[0];
}

export function getDaysDifference(day1: DayOfWeek, day2: DayOfWeek) {
  return (daysOfWeek.indexOf(day2) - daysOfWeek.indexOf(day1) + 7) % 7;
}
