import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
// import Test from "./Test";
import App from "./App";
import ErrorFallback from "./ui/ErrorFallback";
// import App from "../reusability/Reuse";
// import "../reusability/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>

    {/* <Test /> */}
  </React.StrictMode>
);
