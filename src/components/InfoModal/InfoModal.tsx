import Modal from "../Modal";
import { useSettings } from "../../stores/settingsStore";

import styles from "./InfoModal.module.scss";

function InfoModal() {
  const { closeModal } = useSettings();
  return (
    <Modal
      size="full"
      onEscKey={closeModal}
      className={styles["info-modal"]}
      onCloseButtonClicked={closeModal}
    >
      <h2>What is this?</h2>
      <p>
        A React implementation of an old school digital alarm clock. You know,
        the kind of clock that we used to rely on before we had smart phones.
        The kind of clock that you could blame for being late for work, claiming
        you had a power cut through the night. That kind of clock.
      </p>

      <h2>But why?</h2>
      <p>
        Just to have a small, achievable project to play around with over the
        Christmas holidays. Can't spend too long without coding, going cold
        turkey (festive pun intended).
      </p>

      <h2>What can it do?</h2>
      <h3>Set multiple alarms</h3>
      <p>
        It's possible so set as many alarms as you want. Each alarm can be
        configured individually from the rest, where you can change things like:
      </p>
      <ul>
        <li>Enable/disable alarm</li>
        <li>Set alarm time (24 hour format only)</li>
        <li>Give the alarm a name</li>
        <li>Set the alarm to repeat on certain days of the week</li>
        <li>Choose the number of minutes the alarm snoozes for</li>
      </ul>
      <h3>Change clock format</h3>
      <p>
        You can choose to display the clock in either 24 hour or 12 hour format.
        To do so, you can click the AM/PM LED section (top-right of the clock
        display) or go into settings and change it from there.
      </p>
      <h3>Choose alarm ringtone</h3>
      <p>
        You can choose the sound the alarm clock makes when it rings from a
        variety of predefined ringtones. These have all been custom created
        (albeit very quickly) and are short, looping sounds.
      </p>
      <h3>Change clock colors</h3>
      <p>
        You can customize the clock colors in the Settings modal. In here, you
        can choose the background color (unilluminated LED characters and LED
        background) and foreground color (illuminated LED characters).
      </p>
      <h2>
        What <i>can't</i> it do?
      </h2>

      <h3>Different sound per alarm</h3>
      <p>
        Currently, only one alarm sound can be selected, and that sound will be
        used for all alarms. It's simple enough to move this into the config for
        each alarm, I just haven't got round it it yet. It'll likely be added in
        the future.
      </p>

      <h3>Be bug-free</h3>
      <p>
        I mean, it <i>could</i> be bug-free, but it's not. Some issues exist.
        Find them for yourself.
      </p>

      <h3>Run DOOM</h3>
      <p>
        Although this is a simulation of a retro device, it's not quite powerful
        enough to run DOOM.
      </p>
    </Modal>
  );
}

export default InfoModal;
