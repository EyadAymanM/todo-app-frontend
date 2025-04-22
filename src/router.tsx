import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Regiser from "./pages/Register";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Regiser /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children:[
      {
        path: '/',
        element: <Home />,
      }
    ]
  }
])