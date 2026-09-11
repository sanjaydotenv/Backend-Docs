import React from "react";
import router from "./app.route.jsx";
import { RouterProvider } from "react-router";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
