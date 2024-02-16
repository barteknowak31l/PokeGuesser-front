import React from "react";

const PokemonDisplay = (props) => {
  const name = props.pokemon.pkmnName;
  let blanks = [];

  for (let i = 0; i < name.length; i++) {
    if (i + 1 <= props.badStreak) {
      blanks.push(name[i]);
    } else {
      blanks.push("_");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(props.pokemon);

    if (props.answer.toLowerCase() === props.pokemon.pkmnName) {
      props.callAPI();
    } else {
      props.setBadStreak(props.badStreak + 1);
    }
  };

  const hiddenName = blanks.map((letter) => (
    <span className="mr-1">{letter}</span>
  ));

  return (
    <>
      <div className="flex items-center justify-center mt-2 mb-2">
        <div className="border border-gray-600">
          <img
            src={props.pokemon.src}
            width={256}
            height={256}
            alt="pokemon"
          ></img>
        </div>
      </div>
      <div className="flex items-center justify-center mb-2">
        <div>{hiddenName}</div>
      </div>

      <div className="flex items-center justify-center text-gray-400 mb-2">
        <div className="mr-2">Types:</div>
        <div className="mr-2">{props.pokemon.type1}</div>
        <div>{props.pokemon.type2}</div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex items-center justify-center text-gray-400 mb-2">
          <label htmlFor="answer">
            <span className="mr-2">guess:</span>
            <input
              className="rounded-md border border-gray-600 min-w-44 mt-2 bg-gray-950 hover:bg-gray-900 text-gray-300"
              type="text"
              id="answer"
              name="answer"
              value={props.answer}
              onChange={props.handleAnswerChange}
            ></input>
          </label>
        </div>
        <div className="flex items-center justify-center text-gray-400 mb-2">
          <button className="rounded-md border border-gray-600 min-w-44 mt-2 bg-gray-950 hover:bg-gray-900 transition">
            submit
          </button>
        </div>
      </form>
    </>
  );
};

export default PokemonDisplay;
