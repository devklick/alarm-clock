import { useEffect, useRef, useState } from "react";

import { AlarmSound, useSettings } from "../stores/settingsStore";
import alarmSoundDescending from "../assets/audio/Descending.mp3";
import alarmSoundMelodic from "../assets/audio/Melodic.mp3";
import alarmSoundNightmare from "../assets/audio/Nightmare.mp3";
import alarmSoundRepeatingNote from "../assets/audio/RepeatingNote.mp3";
import alarmSoundRockUp from "../assets/audio/RockUp.mp3";
import alarmSoundSimple from "../assets/audio/Simple.mp3";
import alarmSoundTechno from "../assets/audio/Techno.mp3";
import alarmSoundUpbeat from "../assets/audio/Upbeat.mp3";
import alarmSoundBirdSong from "../assets/audio/Bird Song.mp3";
import alarmSoundVamperialWaltz from "../assets/audio/Vamperial Waltz.mp3";
import alarmSoundDotty from "../assets/audio/Dotty.mp3";
import alarmSoundMana from "../assets/audio/Mana.mp3";
import alarmSoundMystery from "../assets/audio/Mystery.mp3";
import alarmSoundResolved from "../assets/audio/Resolved.mp3";

const audioSrcMap: Record<AlarmSound, string> = {
  "Repeating Note": alarmSoundRepeatingNote,
  "Rock Up": alarmSoundRockUp,
  Descending: alarmSoundDescending,
  Melodic: alarmSoundMelodic,
  Nightmare: alarmSoundNightmare,
  Simple: alarmSoundSimple,
  Techno: alarmSoundTechno,
  Upbeat: alarmSoundUpbeat,
  "Bird Song": alarmSoundBirdSong,
  "Vamperial Waltz": alarmSoundVamperialWaltz,
  Dotty: alarmSoundDotty,
  Mana: alarmSoundMana,
  Mystery: alarmSoundMystery,
  Resolved: alarmSoundResolved,
};

interface UseAlarmSoundProps {
  autoPlay?: boolean;
}

export function useAlarmSoundPlayer(
  { autoPlay = true }: UseAlarmSoundProps = { autoPlay: true }
) {
  const { alarmSound } = useSettings();
  const audio = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audio.current?.pause();
    audio.current = new Audio(audioSrcMap[alarmSound]);
    audio.current.loop = true;
    audio.current.autoplay = autoPlay;
    setIsPlaying(autoPlay);
  }, [alarmSound, autoPlay]);

  useEffect(() => stop, []);

  function play() {
    audio.current?.play();
    setIsPlaying(true);
  }

  function stop() {
    if (!audio.current) return;
    audio.current.pause();
    audio.current.currentTime = 0;
    setIsPlaying(false);
  }

  return { play, stop, isPlaying };
}
