import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeWithoutReactQuery from "./pages/Home.BeforeReactQuery";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children:[
      {
        path: '/',
        element: <Home />,
      }
    ]
  },

  // this path to mark and see my progress before switching to react query
  { path: "/home_old", element: <HomeWithoutReactQuery /> },
  
])