"use client";

import TaskCard from "@/components/taskCard";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { getTasksThunk } from "@/store/slices/task.slice";
import { Box, Container, Grid } from "@mui/material";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTasksThunk());
  }, []);

  return (
    <Box mt={4}>
      <Container>
        <Grid container spacing={2}>
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
