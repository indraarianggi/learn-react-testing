import React, { useState } from "react";
import List from "./List";

const PhotoList = () => {
  const [refresh, setRefresh] = useState(0);
  const [name, setName] = useState("");

  return (
    <div>
      <button onClick={() => setRefresh((prevValue) => ++prevValue)}>
        Refresh
      </button>
      <div>
        <label htmlFor="name">
          Your Name:
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <List refresh={refresh} name={name} />
      </div>
    </div>
  );
};

export default PhotoList;
