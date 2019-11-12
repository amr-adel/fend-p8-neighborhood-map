import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Map from './Map'
import Data from './Data'
import makeAsyncScriptLoader from 'react-async-script'
import './App.css'

class App extends Component {
  state = {
    malls: [],
    filteredList: [],
    selected: null
  }

  componentDidMount() {
    fetch(`https://api.foursquare.com/v2/venues/search?near=cairo&categoryId=4bf58dd8d48988d1fd941735&client_id=${process.env.REACT_APP_FOURSQUARE_CLIENT_ID}&client_secret=${process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET}&v=20191020`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          malls: data.response.venues,
          filteredList: data.response.venues
        })
      })
      .catch(err => alert(`Unable to get data from FourSquare (${err})`))
  }

  filterList = query => {
    this.setState({
      filteredList: this.state.malls.filter(mall => mall.name.toLowerCase().indexOf(query.trim().toLowerCase()) !== -1),
      selected: null
    })
  }

  setSelected = mall => {
    this.setState({ selected: mall })
  }

  AsyncHOCCallback = () => {
    if (window.google) {
      var map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: { lat: 30.0444, lng: 31.2357 },
        styles: Data.mapStyles,
        disableDefaultUI: true
      })

      this.setState({ map })
    }
  }

  render() {
    const { filteredList, selected, map } = this.state
    let selectedId = selected ? selected.id : null

    return (
      <div className='App'>
        <Sidebar filterList={this.filterList} setSelected={this.setSelected} selectedId={selectedId} filteredList={filteredList} />

        <AsyncHOC asyncScriptOnLoad={this.AsyncHOCCallback} setSelected={this.setSelected} selectedId={selectedId} filteredList={filteredList} map={map} />
      </div>
    )
  }
}

const URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMAP_KEY}`

const AsyncHOC = makeAsyncScriptLoader(URL)(Map)

export default App
