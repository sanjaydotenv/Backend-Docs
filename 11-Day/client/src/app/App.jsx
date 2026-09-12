import React from "react";
import router from "./app.route.jsx";
import { RouterProvider } from "react-router";
import { AuthProvider } from "../context/authContext.jsx";

const App = () => {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
