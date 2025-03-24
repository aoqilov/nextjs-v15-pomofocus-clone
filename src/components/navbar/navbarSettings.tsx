"use client";

import { ChangeTime } from "@/interface";
import React, { Dispatch, SetStateAction, useState } from "react";

const NavbarSettings = ({
  setIsOpen,
  changeTime,
  setChangeTime,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  changeTime: ChangeTime;
  setChangeTime: Dispatch<SetStateAction<ChangeTime>>;
}) => {
  // -----------------------------------   states
  const [updatedTime, setUpdatedTime] = useState<ChangeTime>({
    pomodoro: changeTime.pomodoro / 60,
    short: changeTime.short / 60,
    long: changeTime.long / 60,
  });
  // ------------------------------------  functions
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUpdatedTime((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : Math.max(1, parseInt(value, 10)),
    }));
  }

  function handleSave() {
    const newChangeTime = {
      pomodoro: updatedTime.pomodoro * 60,
      short: updatedTime.short * 60,
      long: updatedTime.long * 60,
    };
    setChangeTime(newChangeTime);
    localStorage.setItem("times", JSON.stringify(newChangeTime));
    setIsOpen(false);
  }

  return (
    <div className="settings-modal">
      <div className="settings">
        <div className="settings__header">
          <h2>SETTING</h2>
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
        <div className="settings__body">
          <h4>TIMER</h4>
          <p>Time (minutes)</p>
          <div className="settings__inputs">
            <div className="settings__input">
              <label>Pomodoro</label>
              <input
                type="number"
                name="pomodoro"
                min={1}
                value={updatedTime.pomodoro}
                onChange={handleChange}
              />
            </div>
            <div className="settings__input">
              <label>Short Break</label>
              <input
                type="number"
                name="short"
                min={1}
                value={updatedTime.short}
                onChange={handleChange}
              />
            </div>
            <div className="settings__input">
              <label>Long Break</label>
              <input
                type="number"
                name="long"
                min={1}
                value={updatedTime.long}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="settings__btns">
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSettings;
