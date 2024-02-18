import Cookies from "js-cookie";
import React from "react";
import LoginForm from "../forms/LoginForm";
class LoginPage extends React.Component {
  state = {
    email: "",
    password: "",
    errors: { password: false, email: false, badCredentials: false },
    isApiLoginRequestPending: false,
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
    this.clearErrorMessages();
    if (this.formValidation()) {
      this.callAPI();
    } else {
      this.setState((prevState) => ({
        password: "",
      }));
    }
  };

  clearErrorMessages = () => {
    this.setState((prevState) => ({
      errors: {
        email: false,
        password: false,
        badCredentials: false,
        isApiLoginRequestPending: false,
      },
    }));
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
    const api = "http://127.0.0.1:8000/api/login_check";

    if (this.state.isApiLoginRequestPending) return;

    this.setState((prevState) => ({
      isApiLoginRequestPending: true,
    }));

    const credentials = {
      username: this.state.email,
      password: this.state.password,
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
        }));

        this.clearErrorMessages();

        this.props.loginCallback(data.token);
        this.props.redirect("/");
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
          isApiLoginRequestPending: false,
        }));
      });
  };

  render() {
    return (
      <>
        <div className="h-full flex flex-cols items-center justify-center">
          <LoginForm
            email={this.state.email}
            password={this.state.password}
            errors={this.state.errors}
            handleChange={this.handleChange}
            handleLoginSubmit={this.handleLoginSubmit}
            isApiLoginRequestPending={this.state.isApiLoginRequestPending}
          ></LoginForm>
        </div>
      </>
    );
  }
}

export default LoginPage;
