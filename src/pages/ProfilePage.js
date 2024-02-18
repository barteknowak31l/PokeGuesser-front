import React from "react";
import Cookies from "js-cookie";
import PokemonList from "../components/PokemonList";

const ProfilePage = (props) => {
  return (
    <>
      {props.pokemonList !== undefined && (
        <PokemonList pokemons={props.pokemonList}></PokemonList>
      )}
    </>
  );
};

export default ProfilePage;
