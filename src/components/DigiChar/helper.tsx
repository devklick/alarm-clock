import DigiChar from "./DigiChar";
import { isDigiChar } from "./types";

export function getDigiChars(value: number, length: number) {
  const chars = value
    .toString()
    .padStart(length, "0")
    .split("")
    .filter(isDigiChar);
  return chars.map((c, i) => <DigiChar value={c} key={i} />);
}
