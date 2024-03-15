import { taskStatus } from "@/consts/task-status.const";
import { Task } from "@/types/task.type";
import { formatDateString } from "@/utils/date.util";
import { Card, CardContent, Grid } from "@mui/material";
import Link from "next/link";
import React from "react";
import TaskStatusLabel from "./taskStatusLabel";
import DueDate from "./dueDate";

type Props = {
  task: Task;
};

const TaskCard: React.FC<Props> = ({ task }) => {
  const { id, title, dueDate, status, createdAt } = task;

  return (
    <Grid item xs={12} sm={6} md={4} key={id}>
      <Card variant="outlined">
        <Link href={`/tasks/${id}`}>
          <CardContent>
            <h2>{title}</h2>
            <p>
              Due date: <DueDate dueDate={dueDate} />
            </p>
            <p>
              Created at:{" "}
              <time dateTime={createdAt}>
                {formatDateString(new Date(createdAt), "yyyy/MM/dd")}
              </time>
            </p>
            <div>
              Status: <TaskStatusLabel status={status} />
            </div>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  );
};

export default TaskCard;
