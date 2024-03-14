import { TaskStatus } from "@/enums/task-status.enum";

export const taskStatus: Record<TaskStatus, string> = {
  [TaskStatus.TO_DO]: "To do",
  [TaskStatus.IN_PROGRESS]: "In progress",
  [TaskStatus.DONE]: "Done",
};
