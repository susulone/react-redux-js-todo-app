import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TASKS_URL = `http://localhost:3001/tasks`;

const initialState = {
    tasks: [],
    status: "idle", // | "loading" | "succeeded" | "failed"
    error: null,
    searchQuery: "",
};

// THUNKS

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    try {
        const response = await axios.get(TASKS_URL);
        return [...response.data];
    } catch (err) {
        return err.message;
    }
});

export const addNewTask = createAsyncThunk(
    "tasks/addNewTask",
    async (initialTask) => {
        try {
            const response = await axios.post(TASKS_URL, initialTask);
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
);

export const editTaskCompleted = createAsyncThunk(
    "tasks/editTaskCompleted",
    async (initialTask) => {
        try {
            const response = await axios.patch(
                `${TASKS_URL}/${initialTask.id}`,
                {
                    completed: initialTask.completed,
                }
            );

            return response.data;
        } catch (err) {
            return err.message;
        }
    }
);

export const editTaskDescription = createAsyncThunk(
    "tasks/editTaskDescription",
    async (initialTask) => {
        try {
            const response = await axios.patch(
                `${TASKS_URL}/${initialTask.id}`,
                {
                    task: initialTask.task,
                }
            );

            return response.data;
        } catch (err) {
            return err.message;
        }
    }
);

export const deleteTaskById = createAsyncThunk(
    "tasks/deleteTask",
    async (initialTask) => {
        try {
            const response = await axios.delete(
                `${TASKS_URL}/${initialTask.id}`
            );
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
);

// SLICE
export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: nanoid(),
                task: action.payload.task,
                completed: false,
                createdAt: new Date().toLocaleDateString("en-US"),
            };
            state.tasks.push(newTask);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload.id
            );
        },
        editTask: (state, action) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.editedTask.id
                    ? action.payload.editedTask
                    : task
            );
        },
        toggleTaskComplete: (state, action) => {
            const index = state.tasks.findIndex(
                (task) => task.id === action.payload.id
            );
            state.tasks[index].completed = action.payload.completed;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            console.log(state.searchQuery);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = "succeeded";
                const loadedTasks = action.payload.map((task) => {
                    return task;
                });
                // Add any fetched tasks to the tasks array
                state.tasks = state.tasks.concat(loadedTasks);
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                console.log(action.payload);
                state.tasks.push(action.payload);
            })
            .addCase(editTaskCompleted.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(
                    (task) => task.id === action.payload.id
                );
                state.tasks[index] = action.payload;
            })
            .addCase(editTaskDescription.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(
                    (task) => task.id === action.payload.id
                );
                state.tasks[index] = action.payload;
            })
            .addCase(deleteTaskById.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(
                    (task) => task.id === action.payload.id
                );
                state = { ...state, tasks: state.tasks.splice(index, 1) };
            });
    },
});

export const {
    addTask,
    deleteTask,
    editTask,
    setSearchQuery,
    toggleTaskComplete,
} = taskSlice.actions;

export const selectAllTasks = (state) => state.tasks.tasks;
export const getTasksStatus = (state) => state.tasks.status;
export const getTasksError = (state) => state.tasks.error;
export const getSearchQuery = (state) => state.tasks.searchQuery;

export default taskSlice.reducer;
