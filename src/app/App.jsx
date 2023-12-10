// Redux

// Components
import { Container } from "react-bootstrap";
import { Footer } from "../common/Footer";
import { Header } from "../common/Header";
import { TaskList } from "../features/tasks/TaskList";

// Styles
import "./App.css";

function App() {
    return (
        <Container fluid>
            <Header />
            <TaskList />
            <Footer />
        </Container>
    );
}

export default App;
