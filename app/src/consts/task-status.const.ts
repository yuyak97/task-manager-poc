import { TaskStatus } from "@/enums/task-status.enum";

export const taskStatus: Record<TaskStatus, string> = {
  [TaskStatus.TO_DO]: "To do",
  [TaskStatus.IN_PROGRESS]: "In progress",
  [TaskStatus.DONE]: "Done",
};

export const statusLabelColor: Record<
  TaskStatus,
  "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
> = {
  [TaskStatus.TO_DO]: "primary",
  [TaskStatus.IN_PROGRESS]: "secondary",
  [TaskStatus.DONE]: "default",
};
