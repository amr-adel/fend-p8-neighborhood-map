import React, { Component } from 'react';
import ListPlaces from "./ListPlaces";
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
        this.fetchPlaces();
    }

    fetchPlaces() {
        fetch('./places.json')
            .then(res => res.json())
            .then(data => this.setState({ malls: data.malls, filteredMalls: data.malls }))
            .catch(err => console.log(err));
    }

    updateQuery(query) {
        this.setState({ filteredMalls: this.state.malls.filter(mall => mall.name.toLowerCase().indexOf(query.trim().toLowerCase()) !== -1), selected: null })
    }

    showInfo = function (mall) {
        this.setState({ selected: mall })
    }

    render() {
        return (
            <div className="App">
                <ListPlaces filter={this.updateQuery} showInfo={this.showInfo} filteredMalls={this.state.filteredMalls} />
                <Map filteredMalls={this.state.filteredMalls} selected={this.state.selected} />
            </div>
        );
    }
}

export default App;
