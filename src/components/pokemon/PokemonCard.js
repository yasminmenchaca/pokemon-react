import React, {Component} from 'react';
import styled from "styled-components";

const Sprite = styled.img`
width: 5em;
height: 5em;
// display: none;
`;

class PokemonCard extends Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
    };

    componentDidMount() {
        const {name, url} = this.props; // give access and work the same as if we had separate const
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`

        this.setState({
            name,
            imageUrl,
            pokemonIndex
        });
    }

    render() {

        return (
            <div className='col-md-3 col-sm-6 mb-5'>
                <div className='card text-capitalize'>
                    <div className='card-header'><h5>#{this.state.pokemonIndex.toString().padStart(3, '0')}</h5></div>
                    <Sprite className='card-img-top rounded mx-auto mt-2' src={this.state.imageUrl}>
                    </Sprite>
                    <div className='card-body mx-auto'><h6 className='card-title'>{this.state.name}</h6></div>
                </div>
            </div>
        );
    }
}

export default PokemonCard;