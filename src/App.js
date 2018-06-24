import React, { Component } from 'react';
import ListPlaces from "./ListPlaces";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListPlaces />
        <div id='map'></div>
      </div>
    );
  }
}

export default App;
