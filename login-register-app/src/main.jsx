import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    { path: "/", element: <LoginPage setUser={setUser} /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/home", element: <HomePage user={user} setUser={setUser} /> },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
