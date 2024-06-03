/* eslint-disable */

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
import { useState } from "react";
import "./index.css";
import TipCalculator from "./tipCalculator";
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
      <TipCalculator />
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
          <Button
            bgColor="#7950f2"
            onClick={previous}
            textColor={"#fff"}
          >{`<---Previous`}</Button>
          <Button bgColor="#7950f2" onClick={next} textColor={"#fff"}>
            {`Next--->`}
          </Button>
        </div>
      </div>
    </>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
