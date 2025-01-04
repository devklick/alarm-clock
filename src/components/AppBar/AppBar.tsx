import {
  IconBrandGithubFilled,
  IconInfoSquareRounded,
  IconSettings,
} from "@tabler/icons-react";

import Button from "../Input/Button";
import { useSettings } from "../../stores/settingsStore";

import styles from "./AppBar.module.scss";

function AppBar() {
  const { openModal } = useSettings();
  return (
    <div className={styles["app-bar"]}>
      <Button.Transparent>
        <IconBrandGithubFilled color="white" />
      </Button.Transparent>
      <Button.Transparent onClick={() => openModal("info")}>
        <IconInfoSquareRounded color="white" />
      </Button.Transparent>
      <Button.Transparent onClick={() => openModal("settings")}>
        <IconSettings color="white" />
      </Button.Transparent>
    </div>
  );
}

export default AppBar;
