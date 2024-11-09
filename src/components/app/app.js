import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';

const App = () => {
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-12">
                    <Header/>
                    <RandomPlanet />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <ItemList />
                </div>
                <div className="col-md-6">
                    <PersonDetails />
                </div>
            </div>
        </div>
    );
};

export default App;