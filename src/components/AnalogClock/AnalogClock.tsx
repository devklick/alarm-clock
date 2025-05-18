import AnalogDisplay from "../AnalogDisplay";
import AnalogClockBody from "./AnalogClockBody";

function AnalogClock() {
  return (
    <AnalogClockBody>
      <AnalogDisplay />
    </AnalogClockBody>
  );
}

export default AnalogClock;
