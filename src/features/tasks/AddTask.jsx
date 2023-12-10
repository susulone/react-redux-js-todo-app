// React
import { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { addTask } from "./taskSlice";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTask({ task: newTask }));
        setNewTask("");
    };

    return (
        <>
            <Stack
                as={Form}
                onSubmit={handleSubmit}
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
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add new task..."
                    />
                </FormGroup>
                <Button type="submit" aria-label="Add Todo">
                    <Plus />
                </Button>
            </Stack>
        </>
    );
};
