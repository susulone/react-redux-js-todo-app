// Components

// Styles
import "./styles.css";

export const Footer = () => {
    const projectLifeTime = () => {
        const projectCreated = new Date("2023-12-10");
        const creationYear = projectCreated.getFullYear();

        const currentYear = new Date().getFullYear();

        if (creationYear !== currentYear) {
            return `${creationYear}–${currentYear}`;
        } else {
            return `${creationYear}`;
        }
    };

    return (
        <footer className="footer">
            <p id="footer-content">
                Copyright <span>&copy; </span>
                {projectLifeTime()} Taskify
            </p>
        </footer>
    );
};
