import styles from "./Label.module.scss";

interface LabelProps {
  value: string;
}

function Label({ value }: LabelProps) {
  return <div className={styles["label"]}>{value}</div>;
}

export default Label;
