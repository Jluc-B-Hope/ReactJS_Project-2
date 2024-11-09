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

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        })
    }

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson })
    };

    render() {
        if(this.state.hasError) return <ErrorIndicator />;

        const itemList = (<ItemList
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}
            renderItem={  ({ name, gender, birthYear }) => `${name} (${gender}, ${birthYear})`}
        />);

        const personDetails = <PersonDetails personId={this.state.selectedPerson} />

        return (
            <Row left={itemList} right={personDetails} />
        )
    }
}