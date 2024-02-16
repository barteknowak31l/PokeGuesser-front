import React from "react";

import Header from "./Header";
import Generations from "./Generations";
import Page from "./Page";

class App extends React.Component {
  state = {
    generation: 1,
    pokemon: {
      pkmnName: "",
      type1: "",
      type2: "",
      src: "",
    },
    pkmnReady: false,
    answer: "",
    badStreak: 0,
  };

  handleGenerationClick = (e) => {
    const generation = parseInt(e.target.getAttribute("name"));
    console.log(generation);
    this.setState((prevState) => ({
      generation,
    }));
    this.callAPI(generation);
  };

  callAPI = (generation) => {
    let api = "";
    if (generation === undefined) {
      api = `http://127.0.0.1:8000/api/pokemon/${this.state.generation}`;
    } else {
      api = `http://127.0.0.1:8000/api/pokemon/${generation}`;
    }

    const request = {
      method: "GET",
    };

    fetch(api, request)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState((prevState) => ({
          pokemon: {
            pkmnName: data.response.name,
            type1: data.response.type1,
            type2: data.response.type2,
            src: data.response.img,
          },
          pkmnReady: true,
          badStreak: 0,
          answer: "",
        }));
        console.log(data.response.name);
      })
      .catch((error) => {
        console.log(error);
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
        <Header />
        <div className="flex basis-auto items-center justify-center items-stretch">
          <div className="basis-1/4 bg-gray-800 mr-2">
            <Generations
              click={this.handleGenerationClick}
              generation={this.state.generation}
            />
          </div>
          <div className="basis-3/4 bg-purple-950 mr-2">
            {this.state.pkmnReady && (
              <Page
                generation={this.state.generation}
                pokemon={this.state.pokemon}
                badStreak={this.state.badStreak}
                callAPI={this.callAPI}
                answer={this.state.answer}
                handleAnswerChange={this.handleChange}
                setBadStreak={this.setBadStreak}
              />
            )}
          </div>
        </div>
        <div className="bg-black mt-1">Footer</div>
      </>
    );
  }
}

export default App;
