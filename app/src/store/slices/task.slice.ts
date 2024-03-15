import {
  TaskCreateRequest,
  TaskUpdateRequest,
  taskControllerCreateTask,
  taskControllerDeleteTask,
  taskControllerGetTaskById,
  taskControllerGetTasks,
  taskControllerUpdateTask,
} from "@/api/generated";
import { ApiError } from "@/enums/api-error.enum";
import { ReduxToolkitSlice } from "@/enums/slice.enum";
import { Task } from "@/types/task.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  tasks: Task[];
  selectedTask?: Task | null;
  createdTask?: Task | null;
  error: string | null;
};

const initialState: InitialState = {
  selectedTask: null,
  createdTask: null,
  tasks: [],
  error: null,
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
  reducers: {
    setCreatedTask: (state, action) => {
      state.createdTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasksThunk.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getTaskByIdThunk.fulfilled, (state, action) => {
      state.selectedTask = action.payload;
    });
    builder.addCase(getTaskByIdThunk.rejected, (state, action) => {
      // TODO: error handling depending on error message is required
      state.error = ApiError.ERR_BAD_REQUEST;
    });
    builder.addCase(createTaskThunk.fulfilled, (state, action) => {
      state.createdTask = action.payload;
    });
  },
});

export const { reducer: taskReducer, actions: taskActions } = taskSlice;
