export interface TimerProps {
  changeDynamicBg: (color: string) => void;
}
export interface TaskModalProps {
  setIsModalOpen: (open: boolean) => void;
}

export interface TaskObject {
  id: string;
  title: string;
  check: boolean;
  estnumber: number;
}

export interface RuleTimeObj {
  id: number;
  label: string;
  color: string;
  labelTime: string;
}
export interface ChangeTime {
  pomodoro: number;
  long: number;
  short: number;
}
