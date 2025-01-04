import AlarmList from "./components/AlarmList";
import AppBar from "./components/AppBar";
import DigiDisplay from "./components/DigiDisplay";
import InfoModal from "./components/InfoModal";
import SettingsModal from "./components/SettingsModal";
import { useSettings } from "./stores/settingsStore";

import "./App.scss";

function App() {
  const { modalType } = useSettings();
  return (
    <div className={"app"}>
      {modalType === "info" && <InfoModal />}
      {modalType === "settings" && <SettingsModal />}
      <AppBar />
      <DigiDisplay />
      <AlarmList />
    </div>
  );
}

export default App;
