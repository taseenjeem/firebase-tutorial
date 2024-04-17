import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
