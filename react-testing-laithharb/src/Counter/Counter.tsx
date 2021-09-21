import React, { useState } from "react";

const Counter = () => {
  const [counterValue, setCounterValue] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number>(1);

  return (
    <div>
      <h1 data-testid="header">My Counter</h1>

      <h2 data-testid="counter">{counterValue}</h2>

      <button data-testid="subtract-btn">-</button>
      <input
        type="number"
        data-testid="input"
        value={inputValue}
        style={{ textAlign: "center" }}
      />
      <button data-testid="add-btn">+</button>
    </div>
  );
};

export default Counter;
