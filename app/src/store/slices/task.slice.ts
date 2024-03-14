import {
  TaskCreateRequest,
  TaskUpdateRequest,
  taskControllerCreateTask,
  taskControllerDeleteTask,
  taskControllerGetTaskById,
  taskControllerGetTasks,
  taskControllerUpdateTask,
} from "@/api/generated";
import { ReduxToolkitSlice } from "@/enums/slice.enum";
import { Task } from "@/type/task.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  tasks: Task[];
  selectedTask: Task | null;
};

const initialState: InitialState = {
  selectedTask: null,
  tasks: [],
};

export const getTasksThunk = createAsyncThunk(
  `${ReduxToolkitSlice.TASK}/getTasksThunk`,
  async () => {
    return taskControllerGetTasks();
  }
);

export const getTaskByIdThunk = createAsyncThunk(
  `${ReduxToolkitSlice.TASK}/getTaskByIdThunk`,
  async (id: number) => {
    return taskControllerGetTaskById(id);
  }
);

export const createTaskThunk = createAsyncThunk(
  `${ReduxToolkitSlice.TASK}/createTaskThunk`,
  async (body: TaskCreateRequest) => {
    return taskControllerCreateTask(body);
  }
);

export const updateTaskThunk = createAsyncThunk(
  `${ReduxToolkitSlice.TASK}/updateTaskThunk`,
  async ({ id, body }: { id: number; body: TaskUpdateRequest }) => {
    return taskControllerUpdateTask(id, body);
  }
);

export const deleteTaskThunk = createAsyncThunk(
  `${ReduxToolkitSlice.TASK}/deleteTaskThunk`,
  async (id: number) => {
    return taskControllerDeleteTask(id);
  }
);

const taskSlice = createSlice({
  name: ReduxToolkitSlice.TASK,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasksThunk.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getTaskByIdThunk.fulfilled, (state, action) => {
      state.selectedTask = action.payload;
    });
    builder.addCase(createTaskThunk.fulfilled, (state, action) => {
      state.selectedTask = action.payload;
    });
  },
});

export const { reducer: taskReducer, actions: taskActions } = taskSlice;
