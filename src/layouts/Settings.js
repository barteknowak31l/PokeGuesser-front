import React from "react";
import { NavLink } from "react-router-dom";

const navList = [
  { name: "Catch'em all", path: "/" },
  { name: "log in", path: "/login" },
  { name: "Register", path: "/register" },
  { name: "Profile", path: "/profile" },
];

const Settings = () => {
  const menu = navList.map((item) => (
    <li key={item.name}>
      <NavLink to={item.path}>{item.name}</NavLink>
    </li>
  ));

  return (
    <nav>
      settings
      <ul>{menu}</ul>
    </nav>
  );
};

export default Settings;
