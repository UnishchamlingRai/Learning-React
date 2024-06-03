/* eslint-disable */
import { useState } from "react";
import "./index.css";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
function Hello() {
  const [num, setNum] = useState(0);
  const [open, setOpen] = useState(false);

  function handelPrevious() {
    if (num > 0) {
      setNum(num - 1);
      step = step + 1;
      console.log(step);
    } else {
      alert("No More Steps");
    }
  }
  console.log("hello");
  function handelNext() {
    if (num < 2) {
      setNum((n) => n + 1);
      setNum((n) => n + 1);
    } else {
      alert("No More Steps");
    }
  }
  return (
    <>
      <button onClick={() => setOpen(!open)}>Close</button>
      {open && (
        <div className="steps">
          <div className="numbers">
            <div
              className="step-1"
              style={{ backgroundColor: `${num >= 0 ? "#7950f2" : ""}` }}
            >
              1
            </div>
            <div
              className="step-2"
              style={{ backgroundColor: `${num >= 1 ? "#7950f2" : ""}` }}
            >
              2
            </div>
            <div
              className="step-3"
              style={{ backgroundColor: `${num >= 2 ? "#7950f2" : ""}` }}
            >
              3
            </div>
          </div>

          <p className="message">
            Step-{num + 1}: {messages[num]}
          </p>

          <div className="buttons">
            <button className="previous" onClick={handelPrevious}>
              Previous
            </button>
            <button className="next" onClick={handelNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Hello;
