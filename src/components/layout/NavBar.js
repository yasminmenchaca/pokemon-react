import React, {Component} from 'react';

class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark fixed-top">
                    <a className="navbar-brand" href="#">PokéDex</a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Filter Pokémon" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav>
            </div>
        );
    }
}

export default NavBar;