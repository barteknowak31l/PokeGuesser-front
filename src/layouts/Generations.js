import React from "react";

const generations = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
];

const Generations = (props) => {
  const gens = generations.map((item) => (
    <li
      key={item.id}
      onClick={props.click}
      name={item.id}
      className={`hover:text-gray-600 ${
        props.generation === item.id ? "border" : ""
      }`}
    >
      {item.id}
    </li>
  ));

  return (
    <>
      Generations
      <ul>{gens}</ul>
    </>
  );
};

export default Generations;
