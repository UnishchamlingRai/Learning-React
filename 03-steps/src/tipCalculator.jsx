import React, { useState } from "react";
function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipMe, setTipMe] = useState(0);
  const [tipFriend, setTipFriend] = useState(0);

  function handelTipMe(tipPrice) {
    setTipMe(tipPrice);
  }
  function handelTipFriend(tipPrice) {
    setTipFriend(tipPrice);
  }

  function RestAll() {
    setBill("");
    setTipMe(0);
    setTipFriend(0);
  }

  const averageTip = (tipMe + tipFriend) / 2;
  const calTip = (averageTip * bill) / 100;
  const totalBill = bill + calTip;
  return (
    <div className="TipCalculator">
      <Bill bill={bill} onSetBill={setBill} />
      <Service tip={tipMe} onHandelTip={handelTipMe}>
        <h3>How did you like the Service?</h3>
      </Service>
      <Service tip={tipFriend} onHandelTip={handelTipFriend}>
        <h3>How did your friend like the Service?</h3>
      </Service>
      <Result totalBill={totalBill} calTip={calTip} />
      <Reset oncRestAll={RestAll} bill={bill} />
    </div>
  );
}

function Bill({ bill, onSetBill }) {
  //   console.log(bi)
  return (
    <div className="content">
      <h3>How much was the bill?</h3>
      <input
        type="text"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function Service({ children, tip, onHandelTip }) {
  return (
    <div className="content">
      {children}
      <select value={tip} onChange={(e) => onHandelTip(Number(e.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was Okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely Amazing! (20%)</option>
      </select>
    </div>
  );
}

function Result({ totalBill, calTip }) {
  if (totalBill > 0) {
    return <h1>{`You pay (Rs.${totalBill} + Rs.${calTip} tip)`}</h1>;
  } else {
    return "";
  }
}

function Reset({ oncRestAll, bill }) {
  return bill > 0 ? <button onClick={oncRestAll}>Reset</button> : "";
}

export default TipCalculator;
