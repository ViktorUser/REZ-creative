import {
  Route,
  Routes,
  BrowserRouter as Router,
} from 'react-router-dom';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.scss";
import "./styles/reset.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
  </React.StrictMode>
);
