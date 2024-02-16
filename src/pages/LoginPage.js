import React from "react";
class LoginPage extends React.Component {
  state = {
    email: "",
    password: "",
    errors: { password: false, email: false, badCredentials: false },
  };

  errors = {
    password: "Password cannot be empty",
    email: "Incorrect email",
    badCredentials: "Incorrect credentials",
  };

  handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;

    if (type === "checkbox" || type === "radio") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked,
      });
    } else {
      const value = e.target.value;
      this.setState({
        [name]: value,
      });
    }
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();

    if (this.formValidation()) {
      this.callAPI();
    } else {
      this.setState((prevState) => ({
        password: "",
      }));
    }
  };

  formValidation = () => {
    let email = false;
    let password = false;

    const testEmail = this.state.email;
    const testPassword = this.state.password;

    if (this.isValidEmail(testEmail)) {
      email = true;
    }

    if (testPassword) {
      password = true;
    }

    this.setState((prevState) => ({
      errors: {
        password: !password,
        email: !email,
        badCredentials: prevState.errors.badCredentials,
      },
    }));

    return email && password;
  };

  isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  callAPI = () => {
    const api = "http://127.0.0.1:8000/api/login";

    const credentials = {
      credentials: {
        login: this.state.email,
        password: this.state.password,
      },
    };

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    };

    fetch(api, request)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        this.setState((prevState) => ({
          email: "",
          password: "",
          errors: {
            email: false,
            password: false,
            badCredentials: false,
          },
        }));
        this.props.loginCallback();
        this.props.loginRedirect("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState((prevState) => ({
          password: "",
          errors: {
            email: prevState.errors.email,
            password: prevState.errors.password,
            badCredentials: true,
          },
        }));
      });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleLoginSubmit} noValidate>
          <div className="grid grid-cols-1">
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
                  value={this.state.email}
                  onChange={this.handleChange}
                ></input>
                {this.state.errors.email && (
                  <div className="text-xs  text-red-800">
                    {this.errors.email}
                  </div>
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
                  value={this.state.password}
                  onChange={this.handleChange}
                ></input>
                {this.state.errors.password && (
                  <div className="text-xs  text-red-800">
                    {this.errors.password}
                  </div>
                )}
              </div>
            </div>
            <div className="justify-self-center">
              <button className="rounded-md bg-gray-800 w-full hover:bg-gray-700 transition shadow-lg border border-gray-800 px-5">
                Log in
              </button>
              {this.state.errors.badCredentials && (
                <div className="text-xs  text-red-800">
                  {this.errors.badCredentials}
                </div>
              )}
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default LoginPage;
