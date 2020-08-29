import React, {Component} from 'react';
import PokemonCard from "./PokemonCard";

class PokemonList extends Component {
    state = { // will always be an object
        url: `https://pokeapi.co/api/v2/pokemon?limit=151`,
        pokemon: null
    }

    componentDidMount() { // visible to user

    }

    render() {
        return (
            <div className="row">
                <PokemonCard/>
                <PokemonCard/>
                <PokemonCard/>
                <PokemonCard/>
            </div>
        );
    }
}

export default PokemonList;