import React, { useState, useEffect } from "react";

const BlankLetter = (props) => {
  const [css, setCSS] = useState("");

  useEffect(() => {
    if (props.letter === "_") return;

    setCSS("-translate-y-3 text-red-800 text-xl font-bold");

    const timer2 = setTimeout(() => {
      setCSS("translate-y-0");
    }, 1000);

    return () => {
      clearTimeout(timer2);
    };
  }, [props.letter]);

  return (
    <div className={`transition  ease-in-out transform ${css}`}>
      {props.letter}
    </div>
  );
};

export default BlankLetter;
