"use client";

import { ChangeTime, TaskObject } from "@/interface";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import Notes from "@/components/notes/notes";
import Timer from "@/components/timer/timer";
import { Toaster } from "sonner";
import Loading from "@/components/loading/loading";

const Home = () => {
  const [mounted, setMounted] = useState(false);

  // Component mount bo‘lganda
  useEffect(() => {
    setMounted(true);
  }, []);

  const [tasks, setTasks] = useState<TaskObject[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });
  const [bgColor, setBgColor] = useState<string>("ba4949");

  const [changeTime, setChangeTime] = useState<ChangeTime>(() => {
    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("times");
      return savedTime
        ? JSON.parse(savedTime)
        : { pomodoro: 1500, short: 300, long: 900 };
    }
  });

  // changeTime o'zgarganda localStorage'ga yozish
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("times", JSON.stringify(changeTime));
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [changeTime, mounted, tasks]);

  function changeBgColor(color: string): void {
    setBgColor(color);
  }

  if (!mounted) return <Loading />; // yoki loader ko'rsatish

  return (
    <div>
      <Toaster position="bottom-center" richColors />
      <div className="wrapper__bgcolor" style={{ background: `#${bgColor}` }}>
        <Navbar changeTime={changeTime} setChangeTime={setChangeTime} />
        <Timer
          bgColor={bgColor}
          changeTime={changeTime}
          setChangeTime={setChangeTime}
          changeBgColor={changeBgColor}
        />
        <Notes tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default Home;
