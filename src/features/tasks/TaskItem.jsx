// React
import { useState } from "react";
import PropTypes from "prop-types";

// Redux

// Components
import { Col, FormCheck, FormControl, Stack } from "react-bootstrap";
import { IconButton } from "../../common/IconButton";

// Styles
import "./styles.css";

export const TaskItem = ({ id, task, completed }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTaskText, setEditedTaskText] = useState(task);
    const [errorMsg, setErrorMsg] = useState("");

    return (
        <Stack direction="horizontal" className="task">
            <FormCheck
                inline
                type="checkbox"
                defaultChecked={completed}
                id={id.toString()}
            />
            {editMode ? (
                <>
                    <Stack>
                        <FormControl value={editedTaskText} />
                        {errorMsg ? (
                            <section id="add-form-error">{errorMsg}</section>
                        ) : (
                            <></>
                        )}
                    </Stack>
                    <IconButton
                        iconName={"save"}
                        handleOnClick={() => {
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
            <IconButton iconName={"delete"} />
        </Stack>
    );
};

TaskItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
};
