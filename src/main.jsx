// React
// import React from "react";
import ReactDOM from "react-dom/client";

// Redux
import { store } from "./app/store";
import { Provider } from "react-redux";

// Components
import App from "./app/App";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);

{
    /* <React.StrictMode></React.StrictMode> */
}
