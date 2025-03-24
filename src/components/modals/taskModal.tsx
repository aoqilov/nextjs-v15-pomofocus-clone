"use client";

import Image from "next/image";
import { CaretDown, CaretUp } from "../../../public";
import { v4 as uuidv4 } from "uuid";
import { TaskObject } from "@/interface";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const TaskModal = ({
  setIsModalOpen,
  setTasks,
  tasks,
  isModalOpen,
}: {
  isModalOpen: boolean;
  tasks: TaskObject[];
  setTasks: Dispatch<SetStateAction<TaskObject[]>>;
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  // --------------------------  states
  const [title, setTitle] = useState<string>("");
  const [estnumber, setEstnumber] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  // -----------------------------  useefects
  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // -----------------------------  functions
  function saveCreate() {
    if (title.trim() === "") return;

    const newTask: TaskObject = {
      id: uuidv4(),
      title: title,
      check: false,
      estnumber,
    };
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);

    setTitle("");
    setEstnumber(1);
  }

  return (
    <div ref={modalRef}>
      <div
        className="modal"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            saveCreate();
          }
        }}
      >
        <input
          type="text"
          placeholder="What are you working on?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="modal__input"
          ref={inputRef}
        />

        <div className="modal__count">
          <h4 className="count-text">Est Pomodoros</h4>
          <div className="count-box">
            <input
              type="number"
              min="1"
              value={estnumber}
              onChange={(e) =>
                setEstnumber(Math.max(1, Number(e.target.value)))
              }
              className="count-input"
            />
            <div className="count-btns">
              <button onClick={() => setEstnumber((prev) => prev + 1)}>
                <Image className="icon-img" src={CaretUp} alt="Increase" />
              </button>
              <button
                onClick={() => setEstnumber((prev) => Math.max(1, prev - 1))}
              >
                <Image className="icon-img" src={CaretDown} alt="Decrease" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal__footer" style={{ justifyContent: "right" }}>
        <div className="footer-btns">
          <button onClick={() => setIsModalOpen(false)} className="cancel">
            Cancel
          </button>
          <button onClick={saveCreate} className="save">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
