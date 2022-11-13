import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "semantic-ui-css/semantic.min.css";

import { Context } from "./context/CartContext";
import AuthProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Context>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Context>
);
