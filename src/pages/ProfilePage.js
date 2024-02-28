import React from "react";
import PokemonList from "../components/PokemonList";

const ProfilePage = (props) => {
  return (
    <>
      {props.pokemonList !== undefined && props.pokemonList.length > 0 ? (
        <PokemonList pokemons={props.pokemonList}></PokemonList>
      ) : (
        <div className="grid items-center justify-center h-full">
          <div className="flex flex-cols items-center justify-center">
            Currently you dont have any Pokemon from this region
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
