import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import NotFound from "./screens/NotFound";
import Profile from "./screens/Profile";
import StoreForm1 from "./screens/StoreForm1";
import Store from "./screens/Store";
import ManageStore from "./screens/ManageStore";
import Cart from "./screens/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
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
    path: "/stores-manage/:name",
    element: <ManageStore />,
  },
  {
    path: "/store/:name",
    element: <Store />,
  },
  {
    path: "/profile",
    element: <Profile />,
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
