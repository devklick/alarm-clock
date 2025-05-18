import { useSettings } from "../../stores/settingsStore";
import DigiDisplay from "../DigiDisplay";
import AnalogClock from "../AnalogClock";

function Clock() {
  const clockType = useSettings((s) => s.clockType);

  return clockType === "digital" ? <DigiDisplay /> : <AnalogClock />;
}

export default Clock;
