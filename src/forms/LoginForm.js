import React from "react";
const LoginForm = (props) => {
  const errors = {
    password: "Password cannot be empty",
    email: "Incorrect email",
    badCredentials: "Incorrect credentials",
  };
  return (
    <>
      <form onSubmit={props.handleLoginSubmit} noValidate>
        <div className="grid grid-cols-1 items-center">
          <span className="text-3xl text-gray-400 text-center">
            Welcome to PokeGuesser!
          </span>
          <span className="text-sm text-gray-600 text-center mb-2">
            Please log in to start the game
          </span>
          <div className="flex basis-auto m-2">
            <div className="basis-1/3 text-gray-500 text-center pr-2">
              <label htmlFor="email">email</label>
            </div>
            <div className="basis-2/3">
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

          <div className="flex basis-auto m-2">
            <div className="basis-1/3 text-gray-500 text-center pr-2">
              <label htmlFor="password">password</label>
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
          </div>
          <div className="justify-self-center">
            <button className="hover:text-purple-700 bg-gray-900 rounded-full text-center  text-gray-400  border-2 border-gray-600 hover:border-gray-500 hover:cursor-pointer min-w-44 mt-2  transition w-full  ">
              Log in
            </button>
          </div>
          <div className="justify-self-center mt-2">
            {props.isApiLoginRequestPending && (
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

export default LoginForm;
