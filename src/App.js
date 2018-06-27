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
        this.setState({ malls: Data.malls, filteredMalls: Data.malls })
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
