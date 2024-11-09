import React, {Component} from 'react';
import './people-page.css';
import ItemList from '../item-list';
import ItemDetails from "../item-details";
import Row from "../row";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";

export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
    };

    

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson })
    };

    render() {
        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
            >
                { (i) => `${i.name} (${i.birthYear})` }
            </ItemList>
        );

        const itemDetails = (

        <ErrorBoundry>
            <ItemDetails itemId={this.state.selectedPerson} />
        </ErrorBoundry>
        );

        return (
            <Row left={itemList} right={itemDetails} />
        )
    }
}