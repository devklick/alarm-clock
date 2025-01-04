import Label from "../Label";
import styles from "./TextBox.module.scss";

interface TextBoxProps {
  label: string;
  value?: string;
  onChange(value: string): void;
  disabled?: boolean;
}

function TextBox({ label, value, onChange, disabled }: TextBoxProps) {
  return (
    <div className={styles["text-box"]}>
      <Label value={label} />
      <input
        className={styles["text-box__value"]}
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.currentTarget.value)}
        disabled={disabled}
      />
    </div>
  );
}

export default TextBox;
