import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./appwrite/authContext";
import { BrowserRouter } from "react-router-dom";
import DatabaseContextProvider from "./appwrite/databaseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DatabaseContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </DatabaseContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
