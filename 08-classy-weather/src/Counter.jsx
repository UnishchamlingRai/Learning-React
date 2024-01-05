import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 5 };
    this.handelIncrement = this.handelIncrement.bind(this);
    this.handdelDecrement = this.handdelDecrement.bind(this);
  }
  handelIncrement() {
    this.setState((currenState) => {
      return { count: currenState.count + 1 };
    });
  }

  handdelDecrement() {
    this.setState((currenState) => {
      return { count: currenState.count - 1 };
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.handdelDecrement}>-</button>

        <span>{this.state.count}</span>
        <button onClick={this.handelIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;
