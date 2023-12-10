// React
import { useState } from "react";
import PropTypes from "prop-types";

// Redux
import { useDispatch } from "react-redux";
import {
    editTaskCompleted,
    editTaskDescription,
    deleteTaskById,
} from "./taskSlice";

// Components
import { Col, FormCheck, FormControl, Stack } from "react-bootstrap";
import { IconButton } from "../../common/IconButton";

// Styles
import "./styles.css";

export const TaskItem = ({ id, task, completed, createdAt }) => {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [editedTaskText, setEditedTaskText] = useState(task);

    const handleTaskCompleted = () => {
        dispatch(
            editTaskCompleted({
                id: id,
                completed: !completed,
            })
        );
    };

    const handleTaskDelete = () => {
        dispatch(
            deleteTaskById({
                id: id,
            })
        );
    };

    const handleTaskEdit = () => {
        dispatch(
            editTaskDescription({
                id: id,
                task: editedTaskText,
            })
        );
    };

    return (
        <Stack direction="horizontal" className="task">
            <FormCheck
                inline
                type="checkbox"
                defaultChecked={completed}
                id={id}
                onChange={handleTaskCompleted}
            />
            {editMode ? (
                <>
                    <Stack>
                        <FormControl
                            value={editedTaskText}
                            required
                            onChange={(e) => setEditedTaskText(e.target.value)}
                        />
                    </Stack>
                    <IconButton
                        iconName={"save"}
                        handleOnClick={() => {
                            handleTaskEdit();
                            setEditMode(false);
                        }}
                    />
                </>
            ) : (
                <>
                    <Col>{task}</Col>
                    <IconButton
                        iconName={"edit"}
                        handleOnClick={() => setEditMode(true)}
                    />
                </>
            )}
            <IconButton iconName={"delete"} handleOnClick={handleTaskDelete} />
        </Stack>
    );
};

TaskItem.propTypes = {
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
};
