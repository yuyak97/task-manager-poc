"use client";

import { taskStatus } from "@/consts/task-status.const";
import { ApiError } from "@/enums/api-error.enum";
import { TaskStatus } from "@/enums/task-status.enum";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import {
  deleteTaskThunk,
  getTaskByIdThunk,
  updateTaskThunk,
} from "@/store/slices/task.slice";
import { TaskUpdateForm } from "@/types/task.type";
import { formatDateString } from "@/utils/date.util";
import { Box, Button, InputLabel, TextField } from "@mui/material";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  params: { id: number };
};

const TaskDetail: React.FC<Props> = ({ params }) => {
  const taskId = params.id;
  const dispatch = useAppDispatch();
  const { selectedTask: task, error } = useAppSelector((state) => state.task);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskUpdateForm>();

  const onSubmit = (body: TaskUpdateForm) => {
    dispatch(updateTaskThunk({ id: taskId, body }));
  };

  const deleteTask = () => {
    router.push("/");

    const isConfirmed = window.confirm("Would you like to delete this task?");

    // If user confirm the delete confirmation, delete the task
    if (isConfirmed) {
      dispatch(deleteTaskThunk(taskId));
      router.push("/");
    }
  };

  useEffect(() => {
    if (isNaN(taskId)) {
      redirect("/");
    }

    dispatch(getTaskByIdThunk(Number(taskId)));
  }, [taskId]);

  useEffect(() => {
    if (!task) {
      return;
    }

    reset({
      title: task.title,
      dueDate: formatDateString(new Date(task.dueDate)),
      status: task.status,
    });
  }, [task, reset]);

  useEffect(() => {
    if (error === ApiError.ERR_BAD_REQUEST) {
      router.push("/404");
    }
  }, [error]);

  return (
    <>
      <Box mt={4} component="form" onSubmit={handleSubmit(onSubmit)}>
        <p>ID: {task && task.id}</p>
        <p>created at: {task && formatDateString(new Date(task.createdAt))}</p>
        <TextField
          fullWidth
          margin="normal"
          {...register("title", { required: true })}
          error={Boolean(errors.title)}
          helperText={errors.title ? "Title is required" : ""}
        />
        <TextField
          fullWidth
          margin="normal"
          type="date"
          {...register("dueDate", { required: true })}
          InputLabelProps={{ shrink: true }}
          error={Boolean(errors.dueDate)}
          helperText={errors.dueDate ? "due date is required" : ""}
        />
        <Box>
          <InputLabel>Status</InputLabel>
          {/* React hook form mightn't support Material UI🤔 
          because default value of select box is not updated by reset, setValue. */}
          <select
            {...register("status", { required: true })}
            defaultValue={TaskStatus.TO_DO}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              fontSize: "16px",
            }}
          >
            {Object.entries(taskStatus).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ mx: 2, mt: 2 }}
          onClick={() => deleteTask()}
        >
          delete
        </Button>
      </Box>
    </>
  );
};

export default TaskDetail;
