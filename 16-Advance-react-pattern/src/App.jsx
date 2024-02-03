import Counter from "./Counter";

export default function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>
      <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
      />
      <Counter>
        <Counter.Decrease icon="-" />
        <Counter.Label>This my super reusable Compount component</Counter.Label>
        <Counter.Increase icon="+" />
        <Counter.Count />
      </Counter>
    </div>
  );
}