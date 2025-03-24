import Image from "next/image";
import { BlackOption } from "../../../public";
import { TaskObject } from "@/interface";
import { Dispatch, SetStateAction, useState } from "react";
import EditModal from "../modals/editModal";

const NotesCard = ({
  tasks,
  setTasks,
  findEditData,
  editData,
}: {
  tasks: TaskObject[];
  editData: TaskObject;
  findEditData: (id: string) => void;
  setTasks: Dispatch<SetStateAction<TaskObject[]>>;
}) => {
  // states    --------
  const [touchData, setTouchData] = useState<string>();
  const [openAcordion, setOpenAcordion] = useState<string | null>();

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
      {tasks.map((i) =>
        openAcordion == i.id ? (
          <div key={i.id} className="add-accordion">
            <EditModal
              setOpenAcordion={setOpenAcordion}
              setTasks={setTasks}
              tasks={tasks}
              editData={editData}
            />
          </div>
        ) : (
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
                  setOpenAcordion(i.id);
                  findEditData(i.id);
                }}
              >
                <Image src={BlackOption} alt="icon-opt" className="icon-img" />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NotesCard;
