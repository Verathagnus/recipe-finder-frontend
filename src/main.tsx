import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "regenerator-runtime";
import store from "./store";
import { Provider } from "react-redux";

// declare global {
//   interface Window {
//       cloudinary: Cloudinary;
//   }
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
