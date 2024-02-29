import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./UserContext";
import "./utils/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
