import { createBrowserRouter } from "react-router";
import Register from "../feature/auth/ui/pages/Register";
import Login from "../feature/auth/ui/pages/Login";
import Profile from "../feature/auth/ui/pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />
  }
]);

export default router;
