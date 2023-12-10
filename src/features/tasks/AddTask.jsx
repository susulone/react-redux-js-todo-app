// React
import { useState } from "react";

// Redux
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addNewTask } from "./taskSlice";

// Components
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Stack,
} from "react-bootstrap";
import { Plus } from "react-feather";

// Styles
import "./styles.css";

export const AddTask = () => {
    const dispatch = useDispatch();

    const [newTask, setNewTask] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");

    const onContentChanged = (e) => setNewTask(e.target.value);

    const canSave = Boolean(newTask) && addRequestStatus === "idle";

    const onAddTaskClicked = (e) => {
        e.preventDefault();
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(
                    addNewTask({
                        id: nanoid(),
                        task: newTask,
                        completed: false,
                        createdAt: new Date().toLocaleDateString("en-US"),
                    })
                ).unwrap();

                setNewTask("");
            } catch (err) {
                console.error("Failed to save the task", err);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    };

    return (
        <>
            <Stack
                as={Form}
                onSubmit={onAddTaskClicked}
                direction="horizontal"
                gap={2}
                id="add-form"
            >
                <FormGroup>
                    <FormLabel column htmlFor="newTodo">
                        New Todo
                    </FormLabel>
                    <FormControl
                        autoFocus
                        required
                        id="newTodo"
                        type="text"
                        value={newTask}
                        onChange={onContentChanged}
                        placeholder="Add new task..."
                    />
                </FormGroup>
                <Button type="submit" aria-label="Add Todo" disabled={!canSave}>
                    <Plus />
                </Button>
            </Stack>
        </>
    );
};
