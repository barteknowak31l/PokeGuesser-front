import React from "react";

const Header = (props) => {
  return (
    <div className="text-center text-3xl mb-4 grid grid-cols-1 pokemon-solid">
      <div className="mb-2">
        <span className="  mr-5">P o k e</span>
        <span className="">G u e s s e r</span>
      </div>
    </div>
  );
};

export default Header;
