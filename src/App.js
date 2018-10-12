import React, { Component } from 'react';
import ListPlaces from "./ListPlaces";
import Data from "./Data";
import Map from "./Map";
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.updateQuery = this.updateQuery.bind(this)
        this.selectMall = this.selectMall.bind(this)
    }

    state = {
        malls: [],
        filteredMalls: [],
        selected: null
    };

    componentDidMount() {
        this.setState({
            malls: Data.malls.sort((a, b) => {
                // https://stackoverflow.com/questions/48111425/sort-objects-in-an-array-alphabetically-based-on-one-property
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return textA.localeCompare(textB);
            }), filteredMalls: Data.malls
        })
    }

    updateQuery(query) {
        this.setState({
            filteredMalls: this.state.malls.filter(mall => mall.name.toLowerCase().indexOf(query.trim().toLowerCase()) !== -1)
        })
    }

    selectMall = function (mall) {
        this.setState({ selected: mall })
    }

    render() {
        return (
            <div className="App">

                <ListPlaces
                    filter={this.updateQuery}
                    selectMall={this.selectMall}
                    selected={this.state.selected}
                    filteredMalls={this.state.filteredMalls}
                />

                <Map
                    filteredMalls={this.state.filteredMalls}
                    selectMall={this.selectMall}
                    selected={this.state.selected}
                />

            </div>
        );
    }
}

export default App;
