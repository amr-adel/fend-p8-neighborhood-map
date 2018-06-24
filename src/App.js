import React, { Component } from 'react';
import ListPlaces from "./ListPlaces";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.updateQuery = this.updateQuery.bind(this)
  }

  state = {
    malls: [],
    filteredMalls: [],
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
    this.setState({ filteredMalls: this.state.malls.filter(mall => mall.name.toLowerCase().indexOf(query.trim().toLowerCase()) !== -1) })
  }


  render() {
    return (
      <div className="App">
        <ListPlaces filter={this.updateQuery} filteredMalls={this.state.filteredMalls} />
      </div>
    );
  }
}

export default App;
