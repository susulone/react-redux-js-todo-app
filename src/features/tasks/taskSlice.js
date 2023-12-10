import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    tasks: [
        {
            id: "1",
            task: "Buy potatoes",
            completed: false,
        },
        {
            id: "2",
            task: "Make food",
            completed: false,
        },
        {
            id: "3",
            task: "Exercise",
            completed: false,
        },
        {
            id: "4",
            task: "Do the dishes",
            completed: false,
        },
        {
            id: "5",
            task: "Floss the teeth",
            completed: false,
        },
        {
            id: "6",
            task: "Play videogames",
            completed: true,
        },
    ],
};

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: nanoid(),
                task: action.payload.task,
                completed: false,
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
    },
});

export const { addTask, deleteTask, editTask, toggleTaskComplete } =
    taskSlice.actions;

export const selectAllTasks = (state) => state.tasks.tasks;

export default taskSlice.reducer;
