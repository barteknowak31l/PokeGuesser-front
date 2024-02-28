import { useEffect } from "react";
import React from "react";

const RegistrationForm = (props) => {
  const errors = {
    password: "Password must be at least 6 characters long",
    secondPassword: "Passwords must match",
    email: "Incorrect email",
    badCredentials: "User already exists",
    agreeTerms: "You must accept Terms of Service",
  };

  useEffect(() => {}, [props.agreeTerms]);

  return (
    <>
      <form onSubmit={props.handleRegisterSubmit} noValidate>
        <div className="grid grid-cols-1 items-center">
          <span className="text-3xl text-gray-400 text-center mb-4">
            Register
          </span>
          <div className="flex m-2">
            <div className="text-gray-500 text-right pr-2">
              <label htmlFor="email">Email</label>
            </div>
            <div className="w-full">
              <input
                className="w-full block text-white bg-gray-700 shadow-lg border border-gray-800 border-1 rounded-md"
                type="email"
                id="email"
                name="email"
                value={props.email}
                onChange={props.handleChange}
              ></input>
              {props.errors.email && (
                <div className="text-xs  text-red-800">{errors.email}</div>
              )}
            </div>
          </div>

          <div className="flex basis-auto m-2 mt-6">
            <div className="basis-1/3 text-gray-500 text-center">
              <label htmlFor="password">Password</label>
            </div>
            <div className="basis-2/3">
              <input
                className="w-full block text-white bg-gray-700 shadow-lg border border-gray-800 border-1 rounded-md"
                type="password"
                id="password"
                name="password"
                value={props.password}
                onChange={props.handleChange}
              ></input>
              {props.errors.password && (
                <div className="text-xs  text-red-800">{errors.password}</div>
              )}
            </div>
            <div className="basis-1/3 text-gray-500 text-center">
              <label htmlFor="password">Repeat</label>
            </div>
            <div className="basis-2/3">
              <input
                className="w-full block text-white bg-gray-700 shadow-lg border border-gray-800 border-1 rounded-md"
                type="password"
                id="secondPassword"
                name="secondPassword"
                value={props.secondPassword}
                onChange={props.handleChange}
              ></input>
              {props.errors.secondPassword && (
                <div className="text-xs  text-red-800">
                  {errors.secondPassword}
                </div>
              )}
            </div>
          </div>
          <div className="flex m-2 mt-6 items-center text-gray-500 ">
            <div className="grid grid-cols-1">
              <div>
                <label htmlFor="agreeTerms">Accept ToS</label>
                <input
                  className="bg-gray-700 rounded-full ml-4"
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  value={props.agreeTerms}
                  onChange={props.handleChange}
                ></input>
              </div>
              {props.errors.agreeTerms && (
                <div className="text-xs  text-red-800">{errors.agreeTerms}</div>
              )}
            </div>
          </div>
          <div className="justify-self-center">
            <button className="hover:text-purple-700 bg-gray-900 rounded-full text-center  text-gray-400  border-2 border-gray-600 hover:border-gray-500 hover:cursor-pointer min-w-44 mt-2  transition w-full  ">
              Register
            </button>
          </div>
          <div className="justify-self-center mt-2">
            {props.isApiRegisterRequestPending && (
              <div className="text-xs">Please wait...</div>
            )}
            {props.errors.badCredentials && (
              <div className="text-xs  text-red-800">
                {errors.badCredentials}
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
