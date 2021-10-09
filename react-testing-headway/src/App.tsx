import React, { useState } from "react";
import { IItem } from "./types";

function App() {
  const [items, setItems] = useState<IItem[]>([]);
  const [text, setText] = useState("");

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.length) return;

    const newItem: IItem = {
      id: Date.now(),
      text,
    };

    setText("");
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div>
      <h1>TODOs</h1>

      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>

      <form onSubmit={submitHandler}>
        <label htmlFor="new-todo">What needs to be done?</label>
        <br />
        <input
          type="text"
          name="newTodo"
          id="new-todo"
          value={text}
          onChange={changeHandler}
        />
        <button>Add #{items.length + 1}</button>
      </form>
    </div>
  );
}

export default App;
