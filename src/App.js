import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Contacts from "./pages/Contacts";
import Chat from "./pages/Chat";
import PrivateRoutes from "./PrivateRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer autoClose={3000} theme="dark" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route path="/chat" element={<Chat />}>
            <Route path=":receiverId" element={<Chat />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  );
};

export default App;
