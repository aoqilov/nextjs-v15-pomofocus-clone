import Image from "next/image";
import { BlackOption } from "../../../public";
import { TaskObject } from "@/interface";
import { Dispatch, SetStateAction, useState } from "react";

const NotesCard = ({
  tasks,
  setTasks,
  findEditData,
  setIsEditOpen,
}: {
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  findEditData: (id: string) => void;
  tasks: TaskObject[];
  setTasks: Dispatch<SetStateAction<TaskObject[]>>;
}) => {
  // states    --------
  const [touchData, setTouchData] = useState<string>();

  // functions --------
  function changeCheck(id: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, check: !task.check } : task
    );
    setTasks(updatedTasks);
  }
  // -----

  return (
    <>
      {tasks.map((i) => (
        <div
          key={i.id}
          onClick={() => setTouchData(i.id)}
          className={`notes__card ${i.id == touchData ? "active" : ""}`}
        >
          <div className={`notes__card-title ${i.check ? "active" : ""}`}>
            <span className="check" onClick={() => changeCheck(i.id)}></span>
            <h4 className="title-text">{i.title}</h4>
          </div>
          <div className="notes__card-more">
            <h4 className="big-num">
              0/ <span className="small-num">{i.estnumber}</span>
            </h4>
            <div
              className="icon-box"
              onClick={() => {
                setIsEditOpen(true);
                findEditData(i.id);
              }}
            >
              <Image src={BlackOption} alt="icon-opt" className="icon-img" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NotesCard;
