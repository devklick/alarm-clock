import { useCurrentMinute } from "../../hooks/timeHooks";
import { getDigiChars } from "./helper";

function Minute() {
  const [minute] = useCurrentMinute();
  return getDigiChars(minute, 2);
}

export default Minute;
