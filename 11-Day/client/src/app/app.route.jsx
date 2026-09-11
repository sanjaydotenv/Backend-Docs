import { createBrowserRouter } from "react-router";
import Register from "../feature/auth/ui/pages/Register";
import Login from "../feature/auth/ui/pages/Login";

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
]);

export default router;
