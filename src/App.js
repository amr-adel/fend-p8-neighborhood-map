import React, { Component } from 'react'
import ListPlaces from './ListPlaces'
import Map from './Map'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filteredMalls: [],
      selected: null
    }

    this.updateQuery = this.updateQuery.bind(this)
    this.selectMall = this.selectMall.bind(this)
  }

  componentDidMount() {
    fetch(`https://api.foursquare.com/v2/venues/search?near=Cairo&categoryId=4bf58dd8d48988d1fd941735&client_id=N0UR5Z3XKXDNY4GWMBV4H4J0VZIHDCKLUZIZ0U4RBNLAE1CG&client_secret=LVDZ0NKPQVY1SMUFSVJJT02ARZOJXWUFMIJ1AZ0ACSLMKNHR&v=20191020`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          malls: data.response.venues,
          filteredMalls: data.response.venues
        })
      })
      .catch(err => alert(`Unable to get data from FourSquare (${err})`))
  }

  updateQuery(query) {
    this.setState({
      filteredMalls: this.state.malls.filter(mall => mall.name.toLowerCase().indexOf(query.trim().toLowerCase()) !== -1)
    })
  }

  selectMall = function(mall) {
    this.setState({ selected: mall })
  }

  render() {
    const { filteredMalls, selected } = this.state

    return (
      <div className='App'>
        <ListPlaces filter={this.updateQuery} selectMall={this.selectMall} selected={selected} filteredMalls={filteredMalls} />

        <Map selectMall={this.selectMall} selected={selected} filteredMalls={filteredMalls} />
      </div>
    )
  }
}

export default App
