import React from 'react';
import ItemList from "../item-list";
import {withData} from "../hoc-helpers";
import SwapiService from "../../services/swapi-service";

const {
    getAllPeople,
    getAllStarships,
    getAllPlanets,
} = new SwapiService();


const PersonList = withData(ItemList, getAllPeople);
const PlanetList = withData(ItemList, getAllPlanets);
const StarshipList = withData(ItemList, getAllStarships);

export {
    PersonList,
    PlanetList,
    StarshipList
}