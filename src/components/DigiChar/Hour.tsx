import { useCurrentHour } from "../../hooks/timeHooks";
import { useSettings } from "../../stores/settingsStore";
import { getDigiChars } from "./helper";

function Hour() {
  const { hourType } = useSettings();
  const [hour] = useCurrentHour(hourType);
  return getDigiChars(hour, 2);
}

export default Hour;
