import React, { Component } from 'react';
import ListPlaces from "./ListPlaces";
import Data from "./Data";
import Map from "./Map";
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            malls: Data.malls.sort((a, b) => {
                // https://stackoverflow.com/questions/48111425/sort-objects-in-an-array-alphabetically-based-on-one-property
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return textA.localeCompare(textB);
            }),
            filteredMalls: [],
            selected: null
        };

        this.updateQuery = this.updateQuery.bind(this)
        this.selectMall = this.selectMall.bind(this)
    }


    componentDidMount() {
        this.setState({
            filteredMalls: this.state.malls
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

        const {filteredMalls, selected} = this.state

        return (
            <div className="App">

                <ListPlaces
                    filter={this.updateQuery}
                    selectMall={this.selectMall}
                    selected={selected}
                    filteredMalls={filteredMalls}
                />

                <Map
                    selectMall={this.selectMall}
                    selected={selected}
                    filteredMalls={filteredMalls}
                />

            </div>
        );
    }
}

export default App;
