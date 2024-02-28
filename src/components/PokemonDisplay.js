import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import BlankLetter from "./blankLetter";

const PokemonDisplay = (props) => {
  const name = props.pokemon.pkmnName;
  let blanks = [];

  const [answerMessage, setAnswerMessage] = useState("");
  const [answerMessageCSS, setAnswerMessageCSS] = useState("");

  useEffect(() => {
    let iid = "";
    if (props.badStreak > 0) {
      setAnswerMessage("Wrong! Try again!");
      setAnswerMessageCSS("text-center text-red-600 text-sm");
      iid = setInterval(() => {
        setAnswerMessage("");
        setAnswerMessageCSS("");
      }, 1000);
    } else {
      setAnswerMessage("Correct!");
      setAnswerMessageCSS("text-center text-green-600 text-sm");
      iid = setInterval(() => {
        setAnswerMessage("");
        setAnswerMessageCSS("");
      }, 10000);
    }

    return () => {
      clearInterval(iid);
    };
  }, [props.badStreak]);

  for (let i = 0; i < name.length; i++) {
    if (i + 1 <= props.badStreak) {
      blanks.push(<BlankLetter key={i} letter={name[i]}></BlankLetter>);
    } else {
      blanks.push(<BlankLetter key={i} letter={"_"}></BlankLetter>);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(props.pokemon);

    if (props.answer.toLowerCase() === props.pokemon.pkmnName) {
      props.callAPI();
      callAPIaddPokemon();
    } else {
      props.setBadStreak(props.badStreak + 1);
    }
  };

  const callAPIaddPokemon = () => {
    const api = `${props.api_link}/api/pokemon/add/${props.pokemon.id}`;

    const token = Cookies.get("jwtToken");

    const request = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    };

    fetch(api, request)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hiddenName = blanks.map((letter) => (
    <span className="mr-1">{letter}</span>
  ));

  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="grid grid-cols-1 auto-cols-min h-full">
          {/*  */}
          <div className="mt-2 mb-2">
            <div className="border rounded-lg border-gray-600 mt-2">
              <img
                src={props.pokemon.src}
                width={256}
                height={256}
                alt="pokemon"
              ></img>
            </div>
            <div className="flex items-center justify-center my-2">
              {hiddenName}
            </div>

            <div className="flex items-center justify-center text-gray-400">
              <div className="mr-2">Types:</div>
              <div className="mr-2">{props.pokemon.type1}</div>
              <div>{props.pokemon.type2}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="h-full">
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-1">
                <div className="flex items-center justify-center text-gray-400 mb-2">
                  <label htmlFor="answer">
                    <span className="mr-2">guess:</span>
                    <input
                      className="rounded-lg border border-gray-600 min-w-44 mt-2 bg-gray-950 hover:bg-gray-900 text-gray-300"
                      type="text"
                      id="answer"
                      name="answer"
                      value={props.answer}
                      onChange={props.handleAnswerChange}
                    ></input>
                  </label>
                </div>
                <div className="flex items-center justify-center text-gray-400 mb-2 w-full">
                  <button className=" hover:text-purple-700 bg-gray-900 rounded-full text-center  text-gray-400  border-2 border-gray-600 hover:border-gray-500 hover:cursor-pointer min-w-44 mt-2  transition w-full">
                    submit
                  </button>
                </div>
                {props.badStreak > 0 ? (
                  <div className="flex items-center justify-center mt-4">
                    <span className={answerMessageCSS}>{answerMessage}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PokemonDisplay;
