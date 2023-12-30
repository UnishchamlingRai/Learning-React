const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
import { useState } from "react";
import "./index.css";
export default function App() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(true);

  const next = () => {
    if (step < 3) {
      setStep((s) => s + 1); //use callback function when updating state based on the current state. like this
      // setStep((s) => s + 1);
      // setStep(step + 1);
    }
  };
  const previous = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpen((is) => !is);
        }}
      >
        {open ? "close" : "open"}
      </button>
      <div className={`${open ? "steps" : "openClose"}`}>
        <div className="numbers">
          <div className={`${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`${step >= 3 ? "active" : ""}`}>3</div>
        </div>
        <p className="message">{messages[step - 1]}</p>

        <div className="buttons">
          <button
            style={{ backgroundColor: "#7950f2", color: "#fff" }}
            onClick={previous}
          >
            Previous
          </button>
          <button
            style={{ backgroundColor: "#7950f2", color: "#fff" }}
            onClick={next}
          >
            Next
          </button>
        </div>
      </div>
      <Counter />
    </>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(Date.now());
  const convertDate = 24 * 60 * 60 * 1000;

  function ClearAll() {
    setCount();
    setStep(1);
    setDate(Date.now());
  }
  // console.log(convertDate);
  return (
    <>
      <div style={{ margin: "auto" }}>
        <div style={{ display: "flex", gap: "20px", margin: "20px" }}>
          <input
            type="range"
            min="0"
            max="10"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />
          <h4>{step}</h4>
        </div>
        <div style={{ display: "flex", gap: "20px", margin: "20px" }}>
          <button
            onClick={() => {
              setCount((c) => c - step);
              setDate((d) => d - step * convertDate);
            }}
          >
            -
          </button>
          {/* <h1>{`Count:${count}`}</h1> */}
          <input
            type="number"
            value={count}
            onChange={(e) => {
              setCount(Number(e.target.value));
              setDate((d) => d + Number(e.target.value) * convertDate);
            }}
          />
          <button
            onClick={() => {
              setCount((c) => c + step);
              setDate((d) => d + step * convertDate);
            }}
          >
            +
          </button>
        </div>

        <h1>{`${
          count === 0
            ? "today is"
            : count > 0
            ? `${count} day from today is`
            : `${Math.abs(count)} day ago was `
        } ${new Date(date).toDateString()}`}</h1>
        {count !== 0 || step !== 1 ? (
          <button onClick={ClearAll}>Reset</button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
/*
#Day1ofClg_askmitra #Clg_askmitra100days
Hello everyone. I'm Unish, and I'm participating in the ITSNP X Askmitra 60-days challenge. During this time, I'm learning react.previously finished learning html,css,JavaScript,some nodejs and some react also but from today I will learn react. And this time, with the help of a small handful of inspiring team members from askmitra.com and Team, I'm confident I'll succeed. I encourage everyone to begin their 100 days by learning anything they choose; it will be fun.

I’m excited already. learn more about this program here: https://clg.askmitra.com

Here's what I learned today.
-Components, Props and JSX
-State Events 


Tags :
#Clg_askmitra100days #Day1ofClg_askmitra #learningeveryday #growingeveryday

If you’re interested start here: https://https://clg.askmitra.com
Thank you.
*/

/*

 #Day1ofClg_askmitra #Clg_askmitra60days

Hello everyone! I'm Unish, and I'm taking part in the ITSNP X Askmitra 60-days challenge. In this period, I'm focusing on learning React. I've previously covered HTML, CSS, JavaScript, some Node.js, and touched on React, but starting today, I am dedicating time to delve deeper into React.

This time, I have the support of a small, inspiring team from askmitra.com, and I'm confident that with their help, I'll succeed. I encourage everyone to begin their 60 days by learning anything they choose; it will be fun.

I'm already feeling the excitement! Learn more about this program here: https://clg.askmitra.com

Here's what I learned today:
Components, Props, and JSX
State Events
Tags:
#Clg_askmitra60days #Day1ofClg_askmitra #learningeveryday #growingeveryday

If you're interested, start your journey here: https://clg.askmitra.com

Thank you! 


*/
