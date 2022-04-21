const Pokedex = require("pokeapi-js-wrapper");

const PokeClient = new Pokedex.Pokedex({
  protocol: "https",
  cache: true,
  timeout: 5000
});

class PokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeList: [],
      interval: {
        limit: 12,
        offset: 0
      }
    };
  }
  componentDidMount() {
    this.fetchPokemon(this.state.interval);
  }
  fetchPokemon = input => {
    PokeClient.getPokemonsList(input).then(response => {
      this.setState({
        pokeList: response.results,
        interval: input
      });
    });
  };
  previous = () => {
    console.log("clicked prev");
    if (this.state.interval.offset > 0) {
      const interval = {
        limit: this.state.interval.limit,
        offset: this.state.interval.offset - this.state.interval.limit
      };
      this.fetchPokemon(interval);
    }
  };

  next = () => {
    console.log("clicked next");
    const interval = {
      limit: this.state.interval.limit,
      offset: this.state.interval.offset + this.state.interval.limit
    };
    this.fetchPokemon(interval);
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
          <ul>
            {this.state.pokeList.map(poke => (
              <li className="poke-card" key={poke.name}>
                <h3>{poke.name}</h3>
              </li>
            ))}
          </ul>

          <button id="previous" className="btn" onClick={this.previous}>
            Previous
          </button>
          <button id="next" className="btn" onClick={this.next}>
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
