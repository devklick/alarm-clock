import AlarmList from "./components/AlarmList";
import AppBar from "./components/AppBar";
import InfoModal from "./components/InfoModal";
import SettingsModal from "./components/SettingsModal";
import { useSettings } from "./stores/settingsStore";

import "./App.scss";
import Clock from "./components/Clock";

function App() {
  const { modalType } = useSettings();
  return (
    <div className={"app"}>
      {modalType === "info" && <InfoModal />}
      {modalType === "settings" && <SettingsModal />}
      <AppBar />
      <Clock />
      <AlarmList />
    </div>
  );
}

export default App;
