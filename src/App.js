import React, { Component } from "react";

export default class App extends Component {
  state = {
    offset: 0,
    limit: 12,
    pokemon: {
      results: []
    },
    pokeDetails: {
      name: "",
      abilities: [],
      sprites: {}
    },
    isInfoShowing: false
  };

  componentDidMount() {
    this.fetchPokemon();
  }

  fetchPokemon = async (
    url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12"
  ) => {
    const response = await fetch(url);
    const pokes = await response.json();
    this.setState({ pokemon: pokes });
    console.log(pokes);
  };

  // fetchDetails = async name => {
  //   const response = await fetch(
  //     `https://pokeapi.co/api/v2/pokemon/${name}`
  //   ).catch(error => console.log(error));
  //   const json = await response.json();
  //   console.log(json);
  //   this.setState({ pokeDetails: json });
  //   this.setState({ isInfoShowing: true });
  // };

  fetchDetails = async name => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).catch(
      error => console.log(error)
    );
    const deets = await res.json();
    console.log(deets);
    this.setState({ pokeDetails: deets });
    this.setState({ isInfoShowing: true });
  };

  nextPokeList = () => {
    if (!this.state.pokemon.next) return;
    this.fetchPokemon(this.state.pokemon.next);
  };

  previousPokeList = () => {
    if (!this.state.pokemon.previous) return;
    this.fetchPokemon(this.state.pokemon.previous);
  };

  handleClose = () => {
    this.setState({ isInfoShowing: false });
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <img
            className="header-logo"
            src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pokedex.png"
            alt="pokedex logo"
          />
          <h1>Pok&eacute;dex</h1>
        </div>

        <div id="main-content">
          {this.state.isInfoShowing ? (
            <div className="poke-card info">
              <img
                src={this.state.pokeDetails.sprites.front_default}
                alt="pokemon"
              />
              <h2>{this.state.pokeDetails.name}</h2>
              <p>ID: {this.state.pokeDetails.id}</p>
              <p>Height: {this.state.pokeDetails.height}</p>
              <button onClick={this.handleClose}>Exit</button>
            </div>
          ) : (
            <ul>
              {this.state.pokemon.results.map(poke => (
                <li
                  className="poke-card"
                  key={poke.name}
                  onClick={() => this.fetchDetails(poke.name)}
                >
                  <h3>{poke.name}</h3>
                </li>
              ))}
            </ul>
          )}

          <button id="previous" className="btn" onClick={this.previousPokeList}>
            Previous
          </button>
          <button id="next" className="btn" onClick={this.nextPokeList}>
            Next
          </button>
        </div>

        <img
          id="pikachu"
          className="hvr-hang"
          src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pikachu.png"
          alt="Pikachu"
        />
      </div>
    );
  }
}
