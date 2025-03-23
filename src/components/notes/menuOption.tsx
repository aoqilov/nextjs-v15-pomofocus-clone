import { TaskObject } from "@/interface";
import React, { Dispatch, SetStateAction } from "react";
import { FaTrashArrowUp } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";

const MenuOption = ({
  setIsOpenMore,
  tasks,
  setTasks,
}: {
  isOpenMore: boolean;
  setIsOpenMore: Dispatch<SetStateAction<boolean>>;
  tasks: TaskObject[];
  setTasks: Dispatch<SetStateAction<TaskObject[]>>;
}) => {
  function allDelete() {
    setTasks([]);
    setIsOpenMore(false);
  }
  function finishedDelete() {
    const deleteFinished = tasks.filter((i) => i.check == false);
    setTasks(deleteFinished);
    setIsOpenMore(false);
  }
  return (
    <div className="menu__option active">
      <ul>
        <li onClick={finishedDelete}>
          <FaTrashArrowUp />
          <p>Clear finished tasks</p>
        </li>
        <li onClick={allDelete}>
          <FaTrash />
          <p>Clear all tasks</p>
        </li>
      </ul>
    </div>
  );
};

export default MenuOption;
