import React, { useEffect, useState } from "react";

export interface ICounterProps {
  description: string;
  defaultCount: number;
}

const Counter = ({ description, defaultCount }: ICounterProps) => {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);
  const [bigEnough, setBigEnough] = useState(defaultCount >= 15);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (count >= 15) {
      timerId = setTimeout(() => setBigEnough(true), 300);
    }

    return () => {
      clearTimeout(timerId);
    };
  });

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
        onClick={() => setTimeout(() => setCount(count + incrementor), 200)}
      >
        +
      </button>
      {bigEnough ? null : <div>I am too small</div>}
    </div>
  );
};

export default Counter;
