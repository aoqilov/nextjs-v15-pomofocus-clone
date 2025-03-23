"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Option, Plus } from "../../../public";
import NotesCard from "../cards/notesCard";
import TaskModal from "../modals/taskModal";
import { TaskObject } from "@/interface";
import EditModal from "../modals/editModal";
import { toast } from "sonner";
import MenuOption from "./menuOption";

const Notes = ({
  tasks,
  setTasks,
}: {
  tasks: TaskObject[];
  setTasks: Dispatch<SetStateAction<TaskObject[]>>;
}) => {
  //------- states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<TaskObject>();
  const [prevCount, setPrevCount] = useState(tasks.length);
  const [isOpenMore, setIsOpenMore] = useState<boolean>(false);
  const [finishTime, setFinishTime] = useState<string>("--:--"); // Yangi state

  //------- functions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.key === "n") {
        setIsModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function findEditData(id: string): void {
    setEditData(tasks.find((i) => i.id == id));
  }

  useEffect(() => {
    const remainingTasks = tasks.filter((item) => !item.check).length;

    if (remainingTasks === 0 && prevCount > 0) {
      toast("You've finished all your tasks for today 🎉", {
        action: {
          label: "Clear all tasks",
          onClick: () => {
            setTasks([]);
          },
        },
      });
    }

    setFinishTime(timeFooter()); // Yangilangan vaqtni saqlash
    setPrevCount(remainingTasks);
  }, [tasks]); // tasks o‘zgarganda ishlaydi
  const timeFooter = (): string => {
    const resLocalTime = JSON.parse(localStorage.getItem("times")) ?? {
      pomodoro: 0,
    };

    const resEstCount = tasks.reduce((sum, task) => sum + task.estnumber, 0);

    // Agar tasks bo‘sh bo‘lsa, faqat joriy vaqtni qaytarish
    if (resEstCount === 0) {
      const now = new Date();
      return now.toTimeString().slice(0, 5); // "HH:MM" formatida qaytaradi
    }

    const totalSeconds = resEstCount * 60 + (resLocalTime.pomodoro || 0);

    const now = new Date();
    now.setSeconds(now.getSeconds() + totalSeconds);

    const formattedHours = now.getHours().toString().padStart(2, "0");
    const formattedMinutes = now.getMinutes().toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div className="notes container">
      <div className="notes__title">
        <p className="notes__title-count">#2</p>
        <p className="notes__title-text">qwerty</p>
      </div>
      <div className={`notes__head active ${isOpenMore ? "active" : ""}`}>
        {isOpenMore && (
          <MenuOption
            tasks={tasks}
            setTasks={setTasks}
            isOpenMore={isOpenMore}
            setIsOpenMore={setIsOpenMore}
          />
        )}
        <h5 className="notes__head-text">Tasks</h5>
        <div
          className="notes__head-more"
          onClick={() => setIsOpenMore(!isOpenMore)}
        >
          <Image src={Option} alt="icon-opt" className="icon-img" />
        </div>
      </div>
      <div className="notes__cardwrapper">
        {isEditOpen ? (
          <EditModal
            setIsEditOpen={setIsEditOpen}
            setTasks={setTasks}
            tasks={tasks}
            editData={editData}
          />
        ) : (
          <NotesCard
            setTasks={setTasks}
            setIsEditOpen={setIsEditOpen}
            tasks={tasks}
            findEditData={(id: string) => findEditData(id)}
          />
        )}
      </div>
      {isModalOpen ? (
        <TaskModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          tasks={tasks}
          setTasks={setTasks}
        />
      ) : (
        <div className="notes__create" onClick={() => setIsModalOpen(true)}>
          <Image src={Plus} alt="icon-plus" className="create-img" />
          <h4 className="create-text">Add Task</h4>
        </div>
      )}

      <div className="notes__info">
        <h5 className="info-count">
          Pommos: <span>0/{prevCount}</span>
        </h5>
        <h5 className="info-count">
          Finish At: <span>{finishTime}</span>
        </h5>
      </div>
    </div>
  );
};

export default Notes;
