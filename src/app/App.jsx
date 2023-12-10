// Redux

// Components
import { Container } from "react-bootstrap";
import { Footer } from "../common/Footer";
import { Header } from "../common/Header";

// Styles
import "./App.css";

function App() {
    return (
        <Container fluid>
            <Header />
            <Footer />
        </Container>
    );
}

export default App;
