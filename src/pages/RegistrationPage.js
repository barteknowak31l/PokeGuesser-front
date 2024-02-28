import React from "react";

import RegistrationForm from "../forms/RegistrationForm";

class RegistrationPage extends React.Component {
  state = {
    email: "",
    password: "",
    secondPassword: "",
    agreeTerms: false,
    errors: {
      password: false,
      secondPassword: false,
      email: false,
      badCredentials: false,
      agreeTerms: false,
    },
    isApiRegisterRequestPending: false,
    registerSuccess: false,
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

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    this.clearErrorMessages();
    if (this.formValidation()) {
      this.callAPI();
    } else {
      this.setState((prevState) => ({
        password: "",
        secondPassword: "",
        agreeTerms: false,
      }));
    }
  };

  clearErrorMessages = () => {
    this.setState((prevState) => ({
      errors: {
        email: false,
        password: false,
        secondPassword: false,
        badCredentials: false,
        isApiLoginRequestPending: false,
      },
    }));
  };

  formValidation = () => {
    let email = false;
    let password = false;
    let secondPassword = false;
    let agreeTerms = false;

    const testEmail = this.state.email;
    const testPassword = this.state.password;
    const testSecondPassword = this.state.secondPassword;
    const testAgreeTerms = this.state.agreeTerms;

    if (this.isValidEmail(testEmail)) {
      email = true;
    }

    // add min 6 chars check
    if (testPassword) {
      if (testPassword.length >= 6) password = true;
    }

    // check if both passwords match
    if (testPassword === testSecondPassword) {
      secondPassword = true;
    }

    agreeTerms = testAgreeTerms;

    this.setState((prevState) => ({
      errors: {
        password: !password,
        email: !email,
        secondPassword: !secondPassword,
        agreeTerms: !agreeTerms,
        badCredentials: prevState.errors.badCredentials,
      },
    }));

    return email && password && secondPassword && agreeTerms;
  };

  isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  callAPI = () => {
    const api = `${this.props.api_link}/api/register`;

    if (this.state.isApiRegisterRequestPending) return;

    this.setState((prevState) => ({
      isApiRegisterRequestPending: true,
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
          throw new Error(
            `HTTP error! Status: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        this.setState((prevState) => ({
          email: "",
          password: "",
          secondPassword: "",
          agreeTerms: false,
          isApiRegisterRequestPending: false,
          registerSuccess: true,
        }));

        this.clearErrorMessages();
      })
      .catch((error) => {
        console.error("Error:", error.message);
        this.setState((prevState) => ({
          email: "",
          password: "",
          secondPassword: "",
          agreeTerms: false,
          errors: {
            email: prevState.errors.email,
            password: prevState.errors.password,
            badCredentials: true,
          },
          isApiRegisterRequestPending: false,
          registerSuccess: false,
        }));
      });
  };

  render() {
    return (
      <>
        {this.state.registerSuccess ? (
          <div className="flex items-center justify-center h-full my-auto">
            <div className="grid grid-cols-1">
              <div className="font-xl text-center">
                User registered succesfully!
              </div>
              <div className="font-md text-center">You may log in now</div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-cols items-center justify-center">
            <RegistrationForm
              email={this.state.email}
              password={this.state.password}
              secondPassword={this.state.secondPassword}
              agreeTerms={this.state.agreeTerms}
              errors={this.state.errors}
              handleChange={this.handleChange}
              isApiRegisterRequestPending={
                this.state.isApiRegisterRequestPending
              }
              handleRegisterSubmit={this.handleRegisterSubmit}
            ></RegistrationForm>
          </div>
        )}
      </>
    );
  }
}

export default RegistrationPage;
