import { taskStatus } from "@/consts/task-status.const";
import { Task } from "@/type/task.type";
import { formatDateString } from "@/utils/date.util";
import { Card, CardContent, Grid } from "@mui/material";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard: React.FC<Props> = ({ task }) => {
  const { id, title, dueDate, status, createdAt } = task;

  return (
    <Grid item xs={12} sm={6} md={4} key={id}>
      <Card variant="outlined">
        <CardContent>
          <h2>{title}</h2>
          <p>
            Due date:{" "}
            <time dateTime={dueDate}>
              {formatDateString(new Date(dueDate), "yyyy/MM/dd")}
            </time>
          </p>
          <p>
            Created at:{" "}
            <time dateTime={createdAt}>
              {formatDateString(new Date(createdAt), "yyyy/MM/dd")}
            </time>
          </p>
          <p>Status: {taskStatus[status]}</p>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TaskCard;
