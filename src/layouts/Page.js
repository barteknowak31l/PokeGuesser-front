import React, { useEffect } from "react";
import PokemonDisplay from "../components/PokemonDisplay";

import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/logoutPage";
import ProfilePage from "../pages/ProfilePage";
import WaitPage from "../pages/WaitPage";

const Page = (props) => {
  const navigate = useNavigate();

  const redirect = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      props.logoutCallback();
    };
    window.addEventListener("unload", handleBeforeUnload);
    return () => {
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {props.isApiRequestPending || props.isProfileApiRequestPending ? (
        <span>
          <WaitPage></WaitPage>
        </span>
      ) : (
        <Routes>
          <Route
            path={"/"}
            element={
              props.logged_in ? (
                <PokemonDisplay
                  pokemon={props.pokemon}
                  badStreak={props.badStreak}
                  callAPI={props.callAPI}
                  answer={props.answer}
                  setBadStreak={props.setBadStreak}
                  handleAnswerChange={props.handleAnswerChange}
                />
              ) : (
                <LoginPage
                  redirect={navigate}
                  loginCallback={props.loginCallback}
                ></LoginPage>
              )
            }
          />

          <Route
            path="/login"
            element={
              <LoginPage
                redirect={navigate}
                loginCallback={props.loginCallback}
              ></LoginPage>
            }
          ></Route>

          <Route
            path="/logout"
            element={
              props.logged_in ? (
                <LogoutPage logoutCallback={props.logoutCallback}></LogoutPage>
              ) : (
                <LoginPage
                  redirect={navigate}
                  loginCallback={props.loginCallback}
                ></LoginPage>
              )
            }
          ></Route>

          <Route
            path="/profile"
            element={
              props.logged_in ? (
                <ProfilePage pokemonList={props.pokemonList}></ProfilePage>
              ) : (
                <LoginPage
                  redirect={navigate}
                  loginCallback={props.loginCallback}
                ></LoginPage>
              )
            }
          ></Route>
        </Routes>
      )}
    </>
  );
};

export default Page;
