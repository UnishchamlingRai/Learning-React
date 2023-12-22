import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
States VS Props



STATE
state is a internal data. the data that is own by the component in which it is declared.
state can be throught as the component memory because it can hold data over a time across multiple re-render.
state can be updated by the component itself.
updating state causes component to re-render by react therefor we use this mechanism of state to make component interactive.


PROPS
props is a external data that is own by the parent data. 
we can think props as function parameters. props work as a communication channel between parent and child component where parent can pass the data into children
props is read only. props cannot be modified by the component that is receiving by them.
when a child component received new update props that will also cause the component to re-render


in conculation when ever the pice of state is pass as a props  when that state is update both component will re-render

in conculation whenever the pice of state is pass as props from parent component to child component whenever the passed state is updated both parent and child component will re-render.


in finally state are used by the developer to make the component interactive. props is used to give parent component ability to configure child component. 
props can be think as the sating of parent component which the parent component the deside the setting as they wise
*/
