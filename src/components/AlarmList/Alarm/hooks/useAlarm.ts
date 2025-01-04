import { useCallback, useEffect, useRef, useState } from "react";
import { AlarmConfig, daysOfWeek } from "../../../../stores/alarmStore";

interface UseAlarmParams {
  config: AlarmConfig | undefined;
  onRinging(): void;
  onAutoSnoozed(): void;
}

/**
 * The various states an alarm can be observed in.
 */
type AlarmState = "disabled" | "waiting" | "ringing" | "snoozing";

function useAlarm({ config, onRinging, onAutoSnoozed }: UseAlarmParams) {
  const [state, setState] = useState<AlarmState>(
    config?.enabled ? "waiting" : "disabled"
  );
  // TODO: Need to move these to the alarm config so they can be persisted,
  // which will allow things like; re-ring after the user hits snooze then refreshes the page
  const lastRingStartAt = useRef<Date | null>(null);
  const lastRingEndAt = useRef<Date | null>(null);

  /**
   * Gets the number of minutes between two dates.
   */
  const minsBetweenDates = useCallback((date1: Date, date2: Date) => {
    const rangForMS = Math.abs(date1.getTime() - date2.getTime());
    return rangForMS / (1000 * 60);
  }, []);

  /**
   * Checks if the alarm has been ringing for at least 1 minute.
   */
  const rangForLongEnough = useCallback(() => {
    if (state !== "ringing" || !lastRingStartAt.current) return false;
    const now = new Date();
    const rangForMins = Math.abs(
      minsBetweenDates(lastRingStartAt.current, now)
    );
    // TODO: Consider moving the alarm ring duration to the alarm config
    return rangForMins >= 1;
  }, [minsBetweenDates, state]);

  /**
   * Checks whether the alarm should ring based on the current date/time and the alarm config
   */
  const shouldRing = useCallback(() => {
    if (!config?.enabled) return;
    if (state !== "waiting") return false;
    const now = new Date();
    // is the current time the same as the alarm time?
    const timeHit =
      now.getHours() === config.time.hour &&
      now.getMinutes() === config.time.minute;

    // JS days starts at sunday = 0, our array starts at monday = 0.
    // adjust the JS to match ours
    const today = new Date().getDay();
    const index = today === 6 ? 0 : today + 1;

    // is the alarm a one-shot (no repeating days), or is it configured to repeat today?
    const dayHit =
      !config.repeat.length || config.repeat.includes(daysOfWeek[index]);

    // alarm may have already rang on this minute and been stopped.
    const alreadyRang =
      lastRingStartAt.current?.getHours() === config.time.hour &&
      lastRingStartAt.current?.getMinutes() === config.time.minute;

    // alarm should ring on time hit and day hit, and not already rang
    return timeHit && dayHit && !alreadyRang;
  }, [
    config?.enabled,
    config?.repeat,
    config?.time.hour,
    config?.time.minute,
    state,
  ]);

  /**
   * Checks whether the alarm should re-ring after being snoozed.
   */
  const shouldReRing = useCallback(() => {
    if (!config?.enabled || !lastRingEndAt.current || state !== "snoozing") {
      return false;
    }
    const now = new Date();
    const minsDiff = minsBetweenDates(now, lastRingEndAt.current);
    return minsDiff >= config.snoozeDuration;
  }, [config?.enabled, config?.snoozeDuration, minsBetweenDates, state]);

  useEffect(() => {
    if (!config?.enabled) {
      return;
    }
    const i = setInterval(() => {
      if (!config.enabled) {
        setState("disabled");
        return;
      }

      if (shouldRing() || shouldReRing()) {
        lastRingStartAt.current = new Date();
        setState("ringing");
        onRinging();
      }

      if (rangForLongEnough()) {
        lastRingEndAt.current = new Date();
        setState("snoozing");
        onAutoSnoozed();
      }
    }, 1000);
    return () => clearInterval(i);
  }, [
    config,
    onRinging,
    onAutoSnoozed,
    rangForLongEnough,
    shouldReRing,
    shouldRing,
  ]);

  function snooze() {
    if (state === "ringing") {
      lastRingEndAt.current = new Date();
      setState("snoozing");
    }
  }

  function stop() {
    if (state === "ringing") {
      lastRingEndAt.current = new Date();
      setState("waiting");
    }
  }

  return {
    snooze,
    stop,
  };
}

// function useAlarm({ config, onRinging }: UseAlarmParams) {
//   const nextAlarmTimer = useRef<NodeJS.Timeout | null>(null);
//   const regularAlarmIntervals = useRef<Record<
//     DayOfWeek,
//     NodeJS.Timeout | null
//   > | null>(null);

//   useEffect(() => {
//     function cleanup() {
//       nextAlarmTimer.current = null;
//       regularAlarmIntervals.current = null;
//     }

//     if (!config?.enabled) {
//       return cleanup;
//     }

//     function canAlarmRingToday(now: Date, alarmTime: TimeStruct) {
//       const nowHour = now.getHours();
//       const nowMinute = now.getMinutes();
//       // if alarm time is at least a minute in the future, it can ring today.
//       return nowHour >= alarmTime.hour && nowMinute > alarmTime.minute;
//     }

//     function getNextAlarmDay(
//       now: Date,
//       config: AlarmConfig,
//       currentDay: DayOfWeek
//     ) {
//       const canRingToday = canAlarmRingToday(now, config.time);

//       // if there's no repeating days, alarm will ring today if possible, otherwise tomorrow.
//       if (!config.repeat.length) {
//         return canRingToday ? currentDay : getNextDay(currentDay);
//       }

//       // If today is a repeating day and the time is in the future, it can ring today,
//       // otherwise it'll ring on the next repeating day.
//       return canRingToday && config.repeat.includes(currentDay)
//         ? currentDay
//         : getNextDay(currentDay, config.repeat);
//     }

//     function calcNextAlarmTime(now: Date, config: AlarmConfig) {
//       const currentDay = daysOfWeek[now.getDay()];
//       const nextAlarmDay = getNextAlarmDay(now, config, currentDay);

//       const alarmTime = new Date();
//       alarmTime.setHours(config.time.hour);
//       alarmTime.setMinutes(config.time.minute);
//       alarmTime.setSeconds(0);
//       alarmTime.setMilliseconds(0);
//       alarmTime.setDate(
//         alarmTime.getDate() + getDaysDifference(currentDay, nextAlarmDay)
//       );
//       return alarmTime;
//     }

//     function createRegularAlarms(
//       currentAlarmTime: Date,
//       repeatingDays: Array<DayOfWeek>
//     ): Record<DayOfWeek, NodeJS.Timeout | null> {
//       const currentAlarmDay = daysOfWeek[currentAlarmTime.getDay()];
//       const calcMS = (day: DayOfWeek): number => {};
//       return {
//         monday: repeatingDays.includes("monday")
//           ? setInterval(onRinging, calcMS("monday"))
//           : null,
//         tuesday: repeatingDays.includes("tuesday")
//           ? setInterval(onRinging, calcMS("tuesday"))
//           : null,
//         wednesday: repeatingDays.includes("wednesday")
//           ? setInterval(onRinging, calcMS("wednesday"))
//           : null,
//         thursday: repeatingDays.includes("thursday")
//           ? setInterval(onRinging, calcMS("thursday"))
//           : null,
//         friday: repeatingDays.includes("friday")
//           ? setInterval(onRinging, calcMS("friday"))
//           : null,
//         saturday: repeatingDays.includes("saturday")
//           ? setInterval(onRinging, calcMS("saturday"))
//           : null,
//         sunday: repeatingDays.includes("sunday")
//           ? setInterval(onRinging, calcMS("sunday"))
//           : null,
//       };
//     }

//     const now = new Date();
//     const nextAlarmTime = calcNextAlarmTime(now, config);
//     const timeToAlarm = nextAlarmTime.getTime() - now.getTime();

//     // create a timer to count down until the next alarm time
//     nextAlarmTimer.current = setTimeout(() => {
//       // when the alarm rings, set up the recurring alarms.
//       //
//       if (!regularAlarmIntervals.current) {
//         regularAlarmIntervals.current = createRegularAlarms(
//           nextAlarmTime,
//           config.repeat
//         );
//       }
//       onRinging();
//     }, timeToAlarm);

//     return cleanup;
//   }, [config, onRinging]);
// }

export default useAlarm;
