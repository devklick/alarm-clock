import { useCurrentMillisecond } from "../../hooks/timeHooks";
import { getDigiChars } from "./helper";

function Millisecond() {
  const [millisecond] = useCurrentMillisecond();
  return getDigiChars(millisecond, 3);
}

export default Millisecond;
