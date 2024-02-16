import React from "react";
import PokemonDisplay from "../components/PokemonDisplay";

const Page = (props) => {
  return (
    <>
      <PokemonDisplay
        pokemon={props.pokemon}
        badStreak={props.badStreak}
        callAPI={props.callAPI}
        answer={props.answer}
        setBadStreak={props.setBadStreak}
        handleAnswerChange={props.handleAnswerChange}
      />
    </>
  );
};

export default Page;
