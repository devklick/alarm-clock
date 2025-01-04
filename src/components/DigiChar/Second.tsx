import { useCurrentSecond } from "../../hooks/timeHooks";
import { getDigiChars } from "./helper";

function Second() {
  const [second] = useCurrentSecond();
  return getDigiChars(second, 2);
}

export default Second;
