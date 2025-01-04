import { useMeridianType } from "../../hooks/timeHooks";
import { useSettings } from "../../stores/settingsStore";
import DigiChar from "./DigiChar";
import { isDigiChar } from "./types";

function MeridianType() {
  const { hourType } = useSettings();
  const [type] = useMeridianType();
  const chars = type.toString().padStart(2, "0").split("").filter(isDigiChar);
  return chars.map((c, i) => (
    <DigiChar
      value={c}
      visibility={hourType === "12" ? "visible" : "hidden"}
      key={i}
    />
  ));
}

export default MeridianType;
