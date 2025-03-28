"use client";

import Image from "next/image";
import { CaretDown, CaretUp } from "../../../public";
import { TaskObject } from "@/interface";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const EditModal = ({
  editData,
  tasks,
  setOpenAcordion,
  setTasks,
}: {
  editData: TaskObject;
  tasks: TaskObject[];
  setTasks: Dispatch<SetStateAction<TaskObject[]>>;
  setOpenAcordion: Dispatch<SetStateAction<string | null>>;
}) => {
  // -----------------------  states
  const [title, setTitle] = useState<string>(editData?.title);
  const [estnumber, setEstnumber] = useState<number>(editData?.estnumber);
  const modalRef = useRef<HTMLDivElement | null>(null);
  //   ---------------------  useefects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenAcordion(null);
      }
    };
    // ---------------------
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenAcordion(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });
  // -----------------------  functions
  function saveCreate() {
    if (title.trim() === "") return;

    if (!editData) return;

    const updatedTasks = tasks.map((task) =>
      task.id === editData.id
        ? { ...task, title: title, estnumber: estnumber }
        : task
    );
    setTasks(updatedTasks);
    setOpenAcordion(null);
    setTitle("");
    setEstnumber(1);
  }
  function deleteData(id: string): void {
    const updatedTasks = tasks.filter((i) => i.id !== id);
    setTasks(updatedTasks);
    setOpenAcordion(null);
  }

  return (
    <div ref={modalRef}>
      <div className="modal">
        <input
          type="text"
          placeholder="What are you working on?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="modal__input"
        />

        <div className="modal__count">
          <h4 className="count-text">Act / Est Pomodoros</h4>
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
      <div className="modal__footer">
        <button
          className="footer-delete"
          onClick={() => deleteData(editData.id)}
        >
          Delete
        </button>
        <div className="footer-btns">
          <button onClick={() => setOpenAcordion(null)} className="cancel">
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

export default EditModal;
