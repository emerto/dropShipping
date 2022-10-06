import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import NotFound from "./screens/NotFound";
import FirstAcc from "./screens/FirstAcc";
import StoreForm1 from "./screens/StoreForm1";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/first",
    element: <FirstAcc />,
  },
  {
    path: "/StoreForm",
    element: <StoreForm1 />,
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
