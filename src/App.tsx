import ForgotPassword from "@/pages/forgot-password";
import HomePage from "@/pages/home-page";
import ResetPassword from "@/pages/reset-password";
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { getUser } from "@/store/slice/user-slice";

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}
