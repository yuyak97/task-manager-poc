import { TaskResponse } from "@/api/generated";
import { TaskStatus } from "@/enums/task-status.enum";

export type Task = Omit<TaskResponse, "status"> & { status: TaskStatus };

export type TaskUpdateForm = {
  title: string;
  dueDate: string;
  status: TaskStatus;
};
