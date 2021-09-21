import React, { useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [counterValue, setCounterValue] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number>(1);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value));
  };

  const addBtnHandler = () => {
    setCounterValue((prevValue) => prevValue + inputValue);
  };

  const subtractBtnHandler = () => {
    setCounterValue((prevValue) => prevValue - inputValue);
  };

  return (
    <div>
      <h1 data-testid="header">My Counter</h1>

      <h2
        data-testid="counter"
        className={`${counterValue >= 100 ? "green" : ""}${
          counterValue <= -100 ? "red" : ""
        }`}
      >
        {counterValue}
      </h2>

      <button data-testid="subtract-btn" onClick={subtractBtnHandler}>
        -
      </button>
      <input
        type="number"
        data-testid="input"
        className="text-center"
        value={inputValue}
        onChange={changeHandler}
      />
      <button data-testid="add-btn" onClick={addBtnHandler}>
        +
      </button>
    </div>
  );
};

export default Counter;
