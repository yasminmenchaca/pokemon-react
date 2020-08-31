import React, {Component} from 'react';
import axios from 'axios';

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

class Pokemon extends Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: ''
        },
        height: '',
        weight: '',
        eggGroup: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: ''
    };

    async componentDidMount() {
        const {pokemonIndex} = this.props.match.params;

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        const pokemonRes = await axios.get(pokemonUrl);

        const name = pokemonRes.data.name;
        const imageUrl = pokemonRes.data.sprites.front_default;

        let {hp, attack, defense, speed, specialAttack, specialDefense} = '';

        pokemonRes.data.stats.map(stat => {
            switch (stat.stat.name) {
                case'hp':
                    hp = stat['base_stat'];
                    break;
                case'attack':
                    attack = stat['base_stat'];
                    break;
                case'defense':
                    defense = stat['base_stat'];
                    break;
                case'speed':
                    speed = stat['base_stat'];
                    break;
                case'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
            }
        });

        const height = (pokemonRes.data.height) / 10;
        const weight = (pokemonRes.data.weight) / 10;
        const types = pokemonRes.data.types.map((type) => type.type.name);

        const abilities = pokemonRes.data.abilities
            .map(ability => {
                return ability.ability.name
                    .toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
            })
            .join(', ');

        const evs = pokemonRes.data.stats.filter(stat => {
            if (stat.effort > 0) {
                return true;
            }
            return false;
        })
            .map(stat => {
                return `${stat.effort} ${stat.stat.name}`.toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
            }).join(', ');

        await axios.get(pokemonSpeciesUrl).then(res => {

            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                }
            });

            const femaleRate = res.data['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate);
            const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

            const eggGroup = res.data['egg_groups'].map(group => {
                return group.name
                    .toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
            }).join(', ');

            const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

            this.setState({
                description,
                genderRatioFemale,
                genderRatioMale,
                catchRate,
                eggGroup,
                hatchSteps
            });
        });

        this.setState({
            imageUrl,
            pokemonIndex,
            name,
            types,
            stats: {
                hp,
                attack,
                defense,
                speed,
                specialAttack,
                specialDefense
            },
            height,
            weight,
            abilities,
            evs
        });
    };

    render() {
        return (
            <div className="col text-capitalize">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                                <h5>#{this.state.pokemonIndex.toString().padStart(3, '0')}</h5>
                            </div>
                            <div className="col-7">
                                <div className="float-right">
                                    {this.state.types.map(type => (
                                        <span key={type} className='badge-pill badge mr-1'
                                              style={{backgroundColor: `#${TYPE_COLORS[type]}`, color: 'white'}}>
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <img src={this.state.imageUrl} className='card-img-top rounded mx-auto mt-2'/>
                            </div>
                            <div className="col-md-9">
                                <h4 className='mx-auto'>{this.state.name}</h4>
                                {/*HP PROGRESS BAR */}
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        HP
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div
                                                className="progress-bar" role='progressBar'
                                                style={{width: `${this.state.stats.hp}%`}}
                                                aria-valuenow='25'
                                                aria-valuemin='0'
                                                aria-valuemax='100'>
                                                <small>{this.state.stats.hp}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Attack PROGRESS BAR */}
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Attack
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div
                                                className="progress-bar" role='progressBar'
                                                style={{width: `${this.state.stats.attack}%`}}
                                                aria-valuenow='25'
                                                aria-valuemin='0'
                                                aria-valuemax='100'>
                                                <small>{this.state.stats.attack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Defense PROGRESS BAR */}
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Defense
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div
                                                className="progress-bar" role='progressBar'
                                                style={{width: `${this.state.stats.defense}%`}}
                                                aria-valuenow='25'
                                                aria-valuemin='0'
                                                aria-valuemax='100'>
                                                <small>{this.state.stats.defense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Speed PROGRESS BAR */}
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Speed
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div
                                                className="progress-bar" role='progressBar'
                                                style={{width: `${this.state.stats.speed}%`}}
                                                aria-valuenow='25'
                                                aria-valuemin='0'
                                                aria-valuemax='100'>
                                                <small>{this.state.stats.speed}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Sp Atk PROGRESS BAR */}
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Sp Atk
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div
                                                className="progress-bar" role='progressBar'
                                                style={{width: `${this.state.stats.specialAttack}%`}}
                                                aria-valuenow='25'
                                                aria-valuemin='0'
                                                aria-valuemax='100'>
                                                <small>{this.state.stats.specialAttack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Sp Def PROGRESS BAR */}
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Sp Def
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div
                                                className="progress-bar" role='progressBar'
                                                style={{width: `${this.state.stats.specialDefense}%`}}
                                                aria-valuenow='25'
                                                aria-valuemin='0'
                                                aria-valuemax='100'>
                                                <small>{this.state.stats.specialDefense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pokemon;