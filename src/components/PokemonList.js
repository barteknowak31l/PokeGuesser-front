import React from "react";

import PokemonListDisplay from "./PokemonListDisplay";

class PokemonList extends React.Component {
  state = {
    pkmnCount: this.props.pokemons.length,
    page: 1,
    hasNext: this.props.pokemons.length > 9,
    hasPrev: false,
  };

  PAGE_SIZE = 8;

  handleChangePageClick = (e) => {
    const option = e.target.getAttribute("name");

    if (option === "next") {
      this.setState((prevState) => ({
        page: prevState.page + 1,
        hasNext:
          this.props.pokemons.length >= (prevState.page + 1) * this.PAGE_SIZE,
        hasPrev: true,
      }));
    } else if (option === "prev") {
      this.setState((prevState) => ({
        page: prevState.page - 1,
        hasNext:
          this.props.pokemons.length >= (prevState.page - 1) * this.PAGE_SIZE,
        hasPrev: prevState.page - 1 > 1,
      }));
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.pokemons != prevProps.pokemons) {
      this.setState({
        hasNext:
          this.props.pokemons.length >= (prevState.page + 1) * this.PAGE_SIZE,
        hasPrev: prevState.page - 1 > 1,
      });
    }
  }

  render() {
    const pkmnList = this.props.pokemons.map((pkmn, index) => {
      return (
        <>
          {index >= (this.state.page - 1) * this.PAGE_SIZE &&
            index < this.state.page * this.PAGE_SIZE && (
              <PokemonListDisplay
                key={pkmn.id}
                pokemon={pkmn}
              ></PokemonListDisplay>
            )}
        </>
      );
    });

    return (
      <>
        <div className="flex flex-wrap">{pkmnList}</div>
        <div className="flex items-center justify-center">
          {this.state.hasPrev && (
            <div
              name="prev"
              onClick={this.handleChangePageClick}
              className="mx-2 px-10 hover:text-purple-700 bg-gray-900 rounded-full text-center  text-gray-400  border-2 border-gray-600  hover:border-gray-500 hover:cursor-pointer"
            >
              ←
            </div>
          )}
          {this.state.hasNext && (
            <div
              name="next"
              onClick={this.handleChangePageClick}
              className="mx-2 px-10  hover:text-purple-700 bg-gray-900 rounded-full text-center  text-gray-400  border-2 border-gray-600 hover:border-gray-500 hover:cursor-pointer"
            >
              →
            </div>
          )}
        </div>
      </>
    );
  }
}

export default PokemonList;
