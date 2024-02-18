import React from "react";
import { NavLink } from "react-router-dom";

const navList = [
  { name: "Play", path: "/", logged_in: true },
  { name: "Pokedex", path: "/profile", logged_in: true },
  { name: "Logout", path: "/logout", logged_in: true },
  { name: "Login", path: "/login", logged_in: false },
  { name: "Register", path: "/register", logged_in: false },
];

class Settings extends React.Component {
  state = {
    currentPage: this.props.logged_in ? "Play" : "Login",
  };

  handleOnClick = (e) => {
    const name = e.target.getAttribute("name");

    if (name === "Pokedex") {
      this.props.callProfileAPI();
    }

    this.setState({
      currentPage: name,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.logged_in !== prevProps.logged_in) {
      this.setState({
        currentPage: this.props.logged_in ? "Play" : "Login",
      });
    }
  }

  render() {
    const menu = navList.map((item) =>
      item.logged_in === this.props.logged_in ? (
        <NavLink key={item.name} to={item.path}>
          <div
            name={item.name}
            onClick={this.handleOnClick}
            className={`hover:text-purple-700 bg-gray-900  mb-4 mx-1 min-h-14  rounded-full text-center pt-1 text-gray-400 transition-transform transform hover:translate-x-2 border transition-border hover:border-l-8 hover:border-purple-900 flex items-center justify-center
          ${
            this.state.currentPage === item.name
              ? "border-l-8 border-purple-900 text-purple-700 translate-x-2"
              : "border-gray-600 text-gray-400"
          }`}
          >
            {item.name}
          </div>
        </NavLink>
      ) : null
    );
    return <>{menu}</>;
  }
}

export default Settings;
