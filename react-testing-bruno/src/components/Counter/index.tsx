import React, { useState } from "react";

export interface ICounterProps {
  description: string;
  defaultCount: number;
}

const Counter = ({ description, defaultCount }: ICounterProps) => {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);

  return (
    <div>
      <h2>
        DESC: {description} - DC: {defaultCount}
      </h2>
      <label htmlFor="incrementor">
        Incrementor:
        <input
          type="number"
          name="incrementor"
          id="incrementor"
          value={incrementor}
          onChange={(e) => {
            setIncrementor(parseInt(e.target.value) || 1);
          }}
        />
      </label>
      <button
        aria-label="Decrement"
        onClick={() => setCount(count - incrementor)}
      >
        -
      </button>
      Current Count: {count}
      <button
        aria-label="Increment"
        onClick={() => setCount(count + incrementor)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
