import styles from "./Switch.module.scss";

interface SwitchProps {
  checked: boolean;
  onChanged?(checked: boolean): void;
}

function Switch({ onChanged, checked }: SwitchProps) {
  function handleToggle() {
    onChanged?.(!checked);
  }
  return (
    <div
      className={`${styles.switch} ${checked ? styles.checked : ""}`}
      onClick={handleToggle}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleToggle();
      }}
    >
      <div className={styles.slider}></div>
    </div>
  );
}

export default Switch;
