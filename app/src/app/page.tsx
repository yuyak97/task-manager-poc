"use client";

import CreateTaskModal from "@/components/createTaskModal";
import TaskCard from "@/components/taskCard";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { getTasksThunk } from "@/store/slices/task.slice";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    dispatch(getTasksThunk());
  }, []);

  return (
    <Box mt={4}>
      <Container>
        <Box mb={2}>
          <Button variant="contained" onClick={handleOpenModal}>
            create new task
          </Button>
        </Box>
        <Grid container spacing={2}>
          {tasks.length ? (
            tasks.map((task) => <TaskCard task={task} key={task.id} />)
          ) : (
            <Box m={2}>
              <Typography variant="h4">No tasks</Typography>
            </Box>
          )}
        </Grid>

        <CreateTaskModal
          openModal={isOpenModal}
          handleCloseModal={handleCloseModal}
        />
      </Container>
    </Box>
  );
};

export default Home;
