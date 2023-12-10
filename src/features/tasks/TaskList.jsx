// React
import { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
    selectAllTasks,
    getTasksStatus,
    getTasksError,
    getSearchQuery,
    fetchTasks,
} from "./taskSlice";

// Components
import { TaskItem } from "./TaskItem";
import { SpinnerWheel } from "../../common/Spinner";

// Styles
import "./styles.css";

export const TaskList = () => {
    const dispatch = useDispatch();

    const searchQuery = useSelector(getSearchQuery);
    const tasks = useSelector(selectAllTasks);
    const tasksStatus = useSelector(getTasksStatus);
    const error = useSelector(getTasksError);

    useEffect(() => {
        if (tasksStatus === "idle") {
            dispatch(fetchTasks());
        }
    }, [tasksStatus, dispatch]);

    let content;
    if (tasksStatus === "loading") {
        content = <SpinnerWheel />;
    } else if (tasksStatus === "succeeded") {
        // Display newest tasks first and move completed tasks to the end
        const orderedTasks = tasks
            .slice()
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .sort((a, b) => {
                return a.completed - b.completed;
            });

        content = orderedTasks.map((task) => (
            <TaskItem
                key={task.id}
                id={task.id}
                task={task.task}
                completed={task.completed}
                createdAt={task.createdAt}
            />
        ));
    } else if (tasksStatus === "failed") {
        content = <p>{error}</p>;
    }

    return (
        <main id="task-list">
            {/* Fix vertical spacing of the items when on big screen */}
            {searchQuery.length > 0
                ? content.filter((item) =>
                      item.props.task
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                  )
                : content}
        </main>
    );
};
