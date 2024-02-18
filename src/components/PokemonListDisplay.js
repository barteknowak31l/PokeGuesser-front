import React from "react";
const PokemonListDisplay = (props) => {
  return (
    <>
      <div className="w-full md:w-1/2 px-4 mb-4 mt-4">
        <div className="flex items-center mb-4">
          <div>
            <img
              src={props.pokemon.spriteUrl}
              width="64"
              height="64"
              className="rounded-full mr-1 border-2 bg-gray-800  border-gray-600"
              alt="pokemon"
            />
          </div>
          <div className="border-l border-gray-600">
            <div className="ml-1">
              <div className="text-md font-medium text-gray-200">
                {props.pokemon.Name}
              </div>
              <div className="text-sm font-light text-gray-400">
                Types: {props.pokemon.type1} {props.pokemon.type2}
              </div>
              <div className="text-xs font-light text-gray-600">
                PokeID: {props.pokemon.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonListDisplay;
