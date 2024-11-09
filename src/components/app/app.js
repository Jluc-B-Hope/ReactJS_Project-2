import React from 'react';
import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from "../error-indicator";

import './app.css';

import PeoplePage from "../people-page";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services/swapi-service";






export default class App extends Component{
    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };


    toggleRandomPlanet = () => {
        this.setState((state)=> {
            return { showRandomPlanet: !state.showRandomPlanet }
        })
    };


    componentDidCatch() {
        this.setState({ hasError: true });
    }


    render() {
        if(this.state.hasError) return <ErrorIndicator />;

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        return (
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-12">
                        <Header/>
                        {planet}
                        <button className="toggle-planet btn btn-warning btn-lg" onClick={this.toggleRandomPlanet}>
                            Toggle Random Planet
                        </button>
                        <ErrorButton />
                    </div>
                </div>
            
                <PeoplePage />

            
                <div className="row">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllPlanets}
                            renderItem={  (item) => <span>{item.name} <button>!</button></span>}
                        />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson} />
                    </div>
                </div>
            

                <div className="row">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllStarships}
                            renderItem={  ({ name, gender, birthYear }) => `${name} 5`}
                        />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson} />
                    </div>
                </div>
            </div>
    
        );
    }
};