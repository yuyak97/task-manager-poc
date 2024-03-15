import { statusLabelColor, taskStatus } from "@/consts/task-status.const";
import { TaskStatus } from "@/enums/task-status.enum";
import { Chip } from "@mui/material";
import React from "react";

type Props = {
  status: TaskStatus;
};

const TaskStatusLabel: React.FC<Props> = ({ status }) => {
  return <Chip label={taskStatus[status]} color={statusLabelColor[status]} />;
};

export default TaskStatusLabel;
