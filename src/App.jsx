import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import NotFound from "./screens/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
