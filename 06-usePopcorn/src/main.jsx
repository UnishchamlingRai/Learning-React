/* eslint-disable */
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./StarRating";

// import App from "./App.jsx";
import App from "./Hello";
import "./index.css";
// import CurrencyConverter from "./CurrencyConverter.jsx";
function Test() {
  const [reting, setRating] = useState(0);

  return (
    <div>
      <StarRating
        maxRating={5}
        onhandelRating={setRating}
        message={["Poor", "Good", "Very Good", "Excelent", "Amazing"]}
        color="red"
        defaultRating={3}
      />
      <p>{`You get ${reting} Rating`}</p>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <App />
  /* <CurrencyConverter /> */
  /* <Test /> */
  // </React.StrictMode>
);
