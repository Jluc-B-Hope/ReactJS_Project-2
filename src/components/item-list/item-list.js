import React, { Component } from 'react';
import Spinner from "../spinner";
import SwapiService from '../../services/swapi-service';
import './item-list.css';

export default class ItemList extends Component {
    state = {
        itemList: null
    };

    componentDidMount() {
        const { getData } = this.props;
        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                });
            });
    }

    renderItems = (arr) => {
        return arr.map((item) => {
            const { id } = item;

            // Проверка на наличие функции renderItem
            if (!this.props.renderItem) {
                console.error('renderItem function is not provided');
                return null;
            }

            const label = this.props.renderItem(item);
            return (
                <li
                    className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}
                >
                    {label}
                </li>
            );
        });
    };

    render() {
        const { itemList } = this.state;

        if (!itemList) {
            return <Spinner />;
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}
