import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from "../error-indicator";
import Row from "../row/row";
import './app.css';

import PeoplePage from "../people-page";
import ItemList from "../item-list";
import ItemDetails, {Record} from "../item-details/item-details";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";

export default class App extends Component{
    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true
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

        const { getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            getAllPeople,
            getAllPlanets } = this.swapiService;

        const personDetails = <ItemDetails
            itemId={11}
            getData={getPerson}
            getImageUrl={getPersonImage}
        >
            <Record field="gender" label="Gender"/>
            <Record field="eyeColor" label="Eye Color"/>
        </ItemDetails>;
        const starshipDetails = <ItemDetails
            itemId={5}
            getData={getStarship}
            getImageUrl={getStarshipImage}
        >
            <Record field="model" label="Model"/>
            <Record field="length" label="Length"/>
            <Record field="costInCredits" label="Cost"/>
        </ItemDetails>;

        return (
            <ErrorBoundry>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-12">
                            <Header/>
                        </div>
                    </div>
                    <ItemList
                        getData={getAllPeople}
                        onItemSelected={() => {}}>

                        { ({name}) => <span>{name}</span> }
                    </ItemList>

                    <ItemList
                        getData={getAllPlanets}
                        onItemSelected={() => {}}>

                        { ({name}) => <span>{name}</span> }
                    </ItemList>
                </div>
            </ErrorBoundry>
        );
    }
};