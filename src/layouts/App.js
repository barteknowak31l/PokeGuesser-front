import React from "react";
import Cookies from "js-cookie";

import Header from "./Header";
import Generations from "./Generations";
import Page from "./Page";
import Settings from "./Settings";

class App extends React.Component {
  state = {
    generation: 1,
    pokemon: {
      id: "",
      pkmnName: "",
      type1: "",
      type2: "",
      src: "",
    },
    pkmnReady: false,
    answer: "",
    badStreak: 0,

    logged_in: Cookies.get("jwtToken") != undefined,
    isApiRequestPending: false,
    isProfileApiRequestPending: false,

    pokemonList: [],
  };

  api_link = "https://main-bvxea6i-5httfntlm6xhu.de-2.platformsh.site";
  //api_link = "http://127.0.0.1:8000";

  loginCallback = (_token) => {
    Cookies.set("jwtToken", _token);
    this.setState((prevState) => ({
      logged_in: true,
    }));
    this.callAPI();
  };

  logoutCallback = () => {
    Cookies.remove("jwtToken");
    this.setState((prevState) => ({
      logged_in: false,
    }));
  };

  handleGenerationClick = (e) => {
    if (this.state.isApiRequestPending || this.state.isProfileApiRequestPending)
      return;

    const generation = parseInt(e.target.getAttribute("name"));
    console.log(generation);
    this.setState((prevState) => ({
      generation,
    }));
    this.callAPI(generation);
    this.callProfileAPI(generation);
  };

  handleProfileChangePageClick = (e) => {
    const option = e.target.getAttribute("name");

    if (option === "prev") {
      this.setState((prevState) => ({
        page: prevState.page - 1,
      }));
    } else if (option === "next") {
      this.setState((prevState) => ({
        page: prevState.page + 1,
      }));
    }
  };

  callAPI = (generation) => {
    if (this.state.isApiRequestPending) return;

    this.setState((prevState) => ({
      isApiRequestPending: true,
    }));

    let api = "";
    if (generation === undefined) {
      api = `${this.api_link}/api/pokemon/${this.state.generation}`;
    } else {
      api = `${this.api_link}/api/pokemon/${generation}`;
    }

    const token = Cookies.get("jwtToken");

    // console.log(`token: ${token}`);

    const request = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };

    fetch(api, request)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            this.setState({
              logged_in: false,
            });
          }
          throw new Error(`Http error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState((prevState) => ({
          pokemon: {
            id: data.response.id,
            pkmnName: data.response.name,
            type1: data.response.type1,
            type2: data.response.type2,
            src: data.response.img,
          },
          pkmnReady: true,
          badStreak: 0,
          answer: "",
        }));
        this.setState((prevState) => ({
          isApiRequestPending: false,
        }));
      })
      .catch((error) => {
        console.log(error);
        this.setState((prevState) => ({
          isApiRequestPending: false,
        }));
      });
  };

  callProfileAPI = (generation) => {
    if (this.state.isApiRequestPending) return;

    this.setState((prevState) => ({
      isApiRequestPending: true,
    }));

    let api = "";
    if (generation === undefined || generation instanceof Object) {
      api = `${this.api_link}/api/pokemon/all/${this.state.generation}`;
    } else {
      api = `${this.api_link}/api/pokemon/all/${generation}`;
    }
    const token = Cookies.get("jwtToken");

    const request = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };

    fetch(api, request)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            this.setState({
              logged_in: false,
            });
          }

          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data.response.message);
        this.setState((prevState) => ({
          pokemonList: data.response.message,
          isApiRequestPending: false,
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState((prevState) => ({
          isApiRequestPending: false,
        }));
      });
  };

  setBadStreak = (value) => {
    this.setState(() => ({
      badStreak: value,
    }));
  };

  componentDidMount() {
    this.callAPI();
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <>
        <div className="min-h-screen flex flex-col acme-regular">
          <div className="mt-2">
            <Header />
          </div>
          <div className="flex basis-auto items-center justify-center items-stretch min-h-96 flex-grow">
            <div className="basis-1/4 mr-2 ">
              {this.state.logged_in && (
                <div className="grid cols-1 h-full px-2">
                  <Generations
                    click={this.handleGenerationClick}
                    generation={this.state.generation}
                  />
                </div>
              )}
              {!this.state.logged_in && (
                <div className="h-full bg-gray-900 rounded-lg border border-2 border-gray-700"></div>
              )}
            </div>
            <div className="basis-2/4 bg-purple-950 border border-2 border-gray-700 max-w-md  rounded-lg mr-2">
              <Page
                generation={this.state.generation}
                pokemon={this.state.pokemon}
                badStreak={this.state.badStreak}
                callAPI={this.callAPI}
                answer={this.state.answer}
                handleAnswerChange={this.handleChange}
                setBadStreak={this.setBadStreak}
                loginCallback={this.loginCallback}
                logoutCallback={this.logoutCallback}
                pkmnReady={this.state.pkmnReady}
                pokemonList={this.state.pokemonList}
                isApiRequestPending={this.state.isApiRequestPending}
                isProfileApiRequestPending={
                  this.state.isProfileApiRequestPending
                }
                logged_in={this.state.logged_in}
                api_link={this.api_link}
              />
            </div>
            <div className="basis-1/4  mr-2">
              <div className="grid cols-1 px-2 h-full">
                <div className="row-start-2">
                  <Settings
                    logged_in={this.state.logged_in}
                    callProfileAPI={this.callProfileAPI}
                    generation={this.generation}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 rounded-lg text-right pr-5 text-sm text-gray-600 transition ">
            Made by:{" "}
            <a
              className="hover:text-purple-900"
              href="https://github.com/barteknowak31l/PokeGuesser-front"
              target="_blank"
              rel="noreferrer noopener"
            >
              FazDevGuy
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default App;
