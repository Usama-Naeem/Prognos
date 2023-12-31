import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify } from "aws-amplify";
import App from "./App";
import awsconfig from "./aws-exports";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n/config";

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
