import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeHigh, FaVolumeLow } from "react-icons/fa6";

const SoundTimer = ({
  setVolume,
  setVolumeModal,
}: {
  setVolume: (value: number) => void;
  setVolumeModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [numVolume, setNumVolume] = useState(3);
  const modalRef = useRef<HTMLDivElement | null>(null);
  //
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setVolumeModal(false); // Modal yopiladi
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  //
  function changeVolume(num: number): void {
    setVolume(num);
    setNumVolume(num);
  }
  return (
    <div className="volume" ref={modalRef}>
      <p className="volume__text">sound settings</p>
      <div className="volume__icons">
        <FaVolumeMute
          onClick={() => {
            changeVolume(0);
          }}
          className={`icon-volume ${numVolume == 0 ? "active" : ""}`}
        />

        <FaVolumeLow
          onClick={() => {
            changeVolume(0.5);
          }}
          className={`icon-volume ${numVolume == 0.5 ? "active" : ""}`}
        />
        <FaVolumeHigh
          onClick={() => {
            changeVolume(1.0);
          }}
          className={`icon-volume ${numVolume == 1.0 ? "active" : ""}`}
        />
      </div>
    </div>
  );
};

export default SoundTimer;
