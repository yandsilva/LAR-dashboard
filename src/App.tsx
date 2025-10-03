import HomePage from "@/pages/home-page";
import SignIn from "@/pages/sign-in";
import { Route, Routes } from "react-router-dom";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}
