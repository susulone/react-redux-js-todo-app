// Components
import { SearchTask } from "../../features/tasks/SearchTask";
import { Layers } from "react-feather";

// Styles
import "./styles.css";

export const Header = () => {
    return (
        <header id="header">
            <section id="logo-wrapper">
                <Layers />
                <h6>Taskify</h6>
            </section>
            <SearchTask />
        </header>
    );
};
