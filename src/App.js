import React, { Component } from 'react';
import ListPlaces from "./ListPlaces";
import Data from "./Data";
import Map from "./Map";
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.updateQuery = this.updateQuery.bind(this)
        this.showInfo = this.showInfo.bind(this)
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
            filteredMalls: this.state.malls.filter(mall => mall.name.toLowerCase().indexOf(query.trim().toLowerCase()) !== -1),
            selected: null
        })
    }

    showInfo = function (mall) {
        this.setState({ selected: mall })
    }

    render() {
        return (
            <div className="App">

                <ListPlaces
                    filter={this.updateQuery}
                    showInfo={this.showInfo}
                    selected={this.state.selected}
                    filteredMalls={this.state.filteredMalls}
                />

                <Map
                    filteredMalls={this.state.filteredMalls}
                    showInfo={this.showInfo}
                    selected={this.state.selected}
                />

            </div>
        );
    }
}

export default App;
