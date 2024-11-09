import React, {Component} from 'react';
import './people-page.css';
import ItemList from '../item-list';
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
        hasError: false
    };

    

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson })
    };

    render() {
        if(this.state.hasError) return <ErrorIndicator />;

        const itemList = (<ItemList
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}
            >
            { (i) => `${i.name} (${i.birthYear})}` }
        </ItemList>);

    const personDetails = (
        <ErrorBoundry>
        <PersonDetails personId={this.state.selectedPerson} />
        </ErrorBoundry>
        );

        return (
            <Row left={itemList} right={personDetails} />
        )
    }
}