import React, { useEffect, useState } from "react";

// const CurrencyConverter = () => {
//   return <div>CurrencyConverter</div>;
// };

// export default CurrencyConverter;

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);

  const [firstCurrency, setFirstCurrency] = useState("EUR");
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const [result, setResult] = useState("");

  useEffect(
    function () {
      async function fetchData() {
        console.log(firstCurrency, secondCurrency);
        let res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`
        );

        res = await res.json();
        console.log("Result:", res.rates[secondCurrency]);
        // console.log("Result:", res.rates.USD);
        setResult(res.rates[secondCurrency]);
      }
      fetchData();
    },
    [amount, firstCurrency, secondCurrency]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        value={firstCurrency}
        onChange={(e) => setFirstCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={secondCurrency}
        onChange={(e) => setSecondCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {firstCurrency} to {result} {secondCurrency}
      </p>
    </div>
  );
}
