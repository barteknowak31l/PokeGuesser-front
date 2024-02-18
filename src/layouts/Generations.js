import React from "react";

const generations = [
  { id: 1, region: "Kanto" },
  { id: 2, region: "Johto" },
  { id: 3, region: "Hoenn" },
  { id: 4, region: "Sinnoh" },
  { id: 5, region: "Unova" },
  { id: 6, region: "Kalos" },
  { id: 7, region: "Alola" },
  { id: 8, region: "Galar" },
  { id: 9, region: "Paldea" },
];

const Generations = (props) => {
  const gens = generations.map((item) => (
    <div
      key={item.id}
      onClick={props.click}
      name={item.id}
      className={`hover:text-purple-700 bg-gray-900  mb-1 mx-1   rounded-full text-center pt-1 text-gray-400 transition-transform transform hover:translate-x-2 border transition-border hover:border-l-8 hover:border-purple-900 flex items-center justify-center

      ${
        props.generation === item.id
          ? "border-l-8 border-purple-900 text-purple-700 translate-x-2"
          : "border-gray-600 text-gray-400"
      }`}
    >
      {item.region}
    </div>
  ));

  return (
    <>
      <span className="flex items-center justify-center text-center mt-1 text-3xl bg-gray-900  mb-1 mx-1 rounded-full pt-1 text-gray-400 font-bold border border-4 border-gray-700 ">
        Region
      </span>
      {gens}
    </>
  );
};

export default Generations;
