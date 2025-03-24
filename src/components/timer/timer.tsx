import Image from "next/image";
import { NextLogo } from "../../../public";
import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import { ChangeTime } from "@/interface";
import { defaultRuleTime } from "@/staticStore";
import { Howl } from "howler";
import { FaVolumeHigh } from "react-icons/fa6";
import SoundTimer from "./soundTimer";

const Timer = ({
  bgColor,
  changeTime,
  changeBgColor,
}: {
  bgColor: string;
  changeTime: ChangeTime;
  setChangeTime: Dispatch<SetStateAction<ChangeTime>>;
  changeBgColor: (color: string) => void;
}) => {
  // ------------------------------------------------------------states

  const [menuNumber, setMenuNmuber] = useState<number>(0);
  const [runingTime, setRuningTime] = useState<boolean>(false);
  const [mainCount, setMainCount] = useState<number>(changeTime["pomodoro"]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [volumeModal, setVolumeModal] = useState(false);
  // --------------------------------------------------------     for sound states
  const [volume, setVolume] = useState(0.5); //  Ovoz balandligi
  const soundClick = useRef(new Howl({ src: ["/audio/clickbtn.mp3"] }));
  const soundAlarm = useRef(new Howl({ src: ["/audio/alarm1.mp3"] }));
  const beep = useRef(new Howl({ src: ["/audio/bigclock.mp3"], loop: true }));

  // ----------------------------------------------------------- useEffects
  // 1-metadata uchun
  useEffect(() => {
    document.title = `${formatTime(mainCount)} - Time to focus!`;
  }, [mainCount]);
  // 2-interval uchun
  useEffect(() => {
    if (runingTime) {
      intervalRef.current = setInterval(() => {
        setMainCount((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      beep.current.play();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      beep.current.stop();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      beep.current.stop();
    };
  }, [runingTime]);
  // 3-sound controll
  useEffect(() => {
    if (mainCount === 0) {
      beep.current.stop(); // ⏹ Beep o‘ynayotgan bo‘lsa to‘xtaydi
      soundAlarm.current.play(); // 🔊 Alarm eshitiladi
      setRuningTime(false);
    }
  }, [mainCount]);
  // 4-maincount  ozgarishi setings orqali
  useEffect(() => {
    setMainCount(changeTime[defaultRuleTime[menuNumber].labelTime]);
  }, [changeTime, menuNumber]);
  // 5-sound range
  useEffect(() => {
    beep.current.volume(volume); //  Ovoz range
  }, [volume]);
  // ------------------------------------------------------------functions
  const formatTime = (seconds: number) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
      seconds % 60
    ).padStart(2, "0")}`;

  function nextBreak(): void {
    const nextWayNumber = menuNumber === 0 ? 1 : 0;
    setMenuNmuber(nextWayNumber);
    changeBgColor(defaultRuleTime[nextWayNumber].color);
    setMainCount(changeTime[defaultRuleTime[nextWayNumber].labelTime]);
    setRuningTime(false);
  }

  return (
    <div className="timer container">
      <div className="timer__menu">
        {defaultRuleTime.map((item) => (
          <div key={item.id}>
            <h4
              onClick={() => {
                changeBgColor(item.color);
                setMenuNmuber(item.id);
                setRuningTime(false);
                setMainCount(changeTime[item.labelTime]);
              }}
              className={`timer__menu-text ${
                menuNumber === item.id ? "active" : ""
              }`}
            >
              {item.label}
            </h4>
          </div>
        ))}
      </div>
      <div className="volume__box">
        <FaVolumeHigh
          className="icc"
          onClick={() => setVolumeModal(!volumeModal)}
        />
        {volumeModal && (
          <SoundTimer setVolumeModal={setVolumeModal} setVolume={setVolume} />
        )}
      </div>
      <div className="timer__table">
        <p className="timer__table-time">{formatTime(mainCount)}</p>
        <div className="timer__table-buttons  active">
          <button
            className="start-btn"
            style={{ color: `#${bgColor}` }}
            onClick={() => {
              setRuningTime(!runingTime);
              soundClick.current.play();
            }}
          >
            {runingTime ? "Pause" : "Start"}
          </button>
          <button
            className={`next-btn ${runingTime && "active"}`}
            onClick={() => {
              nextBreak();
            }}
          >
            <Image src={NextLogo} alt="next-icon" className="next-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
