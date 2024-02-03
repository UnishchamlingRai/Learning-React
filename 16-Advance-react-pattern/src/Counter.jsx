import { createContext, useContext, useState } from "react";
const counterContext = createContext();
function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <counterContext.Provider value={{ count, setCount }}>
      <span>{children}</span>
    </counterContext.Provider>
  );
}

function Count() {
  const { count } = useContext(counterContext);
  return <span>{count}</span>;
}

function Increase({ icon }) {
  const { setCount } = useContext(counterContext);
  return <button onClick={() => setCount((count) => count + 1)}>{icon}</button>;
}

function Decrease({ icon }) {
  const { setCount } = useContext(counterContext);
  return <button onClick={() => setCount((count) => count - 1)}>{icon}</button>;
}

function Label({ children }) {
  return <span>{children}</span>;
}
Counter.Count = Count;
Counter.Increase = Increase;
Counter.Decrease = Decrease;
Counter.Label = Label;
console.log("Counter:", Counter.Count);
export default Counter;
