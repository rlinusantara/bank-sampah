"use client";
import { useState } from "react";

const Hello = () => {
  const [incre, setIncre] = useState(0);

  return (
    <div>
      <p>{incre}</p>
      <button onClick={() => setIncre(incre + 1)}>hello</button>;
    </div>
  );
};

export default Hello;
