"use client";

import { TaskCreateRequest } from "@/api/generated";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { createTaskThunk, taskActions } from "@/store/slices/task.slice";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  openModal: boolean;
  handleCloseModal: () => void;
};

const CreateTaskModal: React.FC<Props> = ({ openModal, handleCloseModal }) => {
  const dispatch = useAppDispatch();
  const { createdTask } = useAppSelector((state) => state.task);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskCreateRequest>();

  const onSubmit = (body: TaskCreateRequest) => {
    dispatch(createTaskThunk(body));
  };

  useEffect(() => {
    if (createdTask) {
      // redirect to task detail screen and set null for createdTask
      router.push(`/tasks/${createdTask.id}`);
      dispatch(taskActions.setCreatedTask(null));
    }
  }, [createdTask]);

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Create New Task</h2>

        <Box mt={4} component="form" onSubmit={handleSubmit(onSubmit)}>
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Save new task
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
