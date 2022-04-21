import React from "react";
//this doesn't work the way I want it to
//I have no idea what I'm doing
//goodbye

const SelectPoke = props => {
  const SelectPoke = async (
    url = `https://pokeapi.co/api/v2/pokemon/${props.poke}`
  ) => {
    const infoResponse = await fetch(url);
    const pokesInfo = await infoResponse.json();
    console.log(pokesInfo);
  };

  return (
    <div className="poke-info">
      <img alt="pokemon" />
      <h1>{props.poke.name}</h1>
      <h2>{this.pokesInfo.id}</h2>
      <p>{this.pokesInfo.abilities}</p>
      <p>{this.pokesInfo.move}</p>
      <p>{this.pokesInfo.type}</p>
      <button>Exit</button>
    </div>
  );
};

export default SelectPoke;
