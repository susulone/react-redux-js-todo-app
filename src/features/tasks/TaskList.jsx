// React

// Redux
import { useSelector } from "react-redux";
import { selectAllTasks } from "./taskSlice";

// Components
import { TaskItem } from "./TaskItem";

// Styles
import "./styles.css";

export const TaskList = () => {
    const tasks = useSelector(selectAllTasks);

    return (
        <main id="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    task={task.task}
                    completed={task.completed}
                />
            ))}
        </main>
    );
};
