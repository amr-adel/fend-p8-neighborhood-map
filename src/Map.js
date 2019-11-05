import React, { Component } from 'react'
import Data from './Data'
import scriptLoader from 'react-async-script-loader'

class Map extends Component {
  state = {
    map: null,
    bounds: null,
    markers: [],
    google: null
  }

  // UNSAFE_componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
  //   if (isScriptLoaded && !this.props.isScriptLoaded) {
  //     if (isScriptLoadSucceed) {
  //       var map = new window.google.maps.Map(document.getElementById('map'), {
  //         zoom: 11,
  //         center: { lat: 30.0444, lng: 31.2357 },
  //         styles: Data.mapStyles,
  //         disableDefaultUI: true
  //       })

  //       var bounds = new window.google.maps.LatLngBounds()

  //       this.setState({ map: map, bounds: bounds, google: window.google.maps })
  //     } else alert(`Unable to Load Google Maps`)
  //   }
  // }

  updateMarkers = function(malls) {
    const { markers, google, map, bounds } = this.state

    markers.map(marker => marker.setMap(null))

    let marker
    let newMarkers = []

    malls.forEach(mall => {
      marker = new google.Marker({
        position: mall.location,
        animation: google.Animation.DROP,
        map: map,
        id: mall.id
      })

      marker.addListener('click', () => this.selectMall(mall))

      bounds.extend(mall.location)

      newMarkers.push(marker)
    })

    this.setState({ markers: newMarkers })

    map.fitBounds(bounds)
    map.setCenter(bounds.getCenter())
  }

  selectMall(mall) {
    if (mall !== this.props.selected) this.props.selectMall(mall)
  }

  recenterMap = function(coor) {
    this.state.map.setZoom(15)
    this.state.map.setCenter(coor)
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { markers, google, map, bounds } = this.state
  //   const { selected, filteredMalls } = this.props

  //   if (google !== prevState.google) {
  //     this.updateMarkers(filteredMalls)
  //   }

  //   if (google !== null && filteredMalls.length !== prevProps.filteredMalls.length) {
  //     this.updateMarkers(filteredMalls)
  //   }

  //   markers.map(marker => marker.setAnimation(null))

  //   if (selected !== null && markers) {
  //     const activeMarkerIndex = markers.map(marker => marker.id).indexOf(selected.id)
  //     markers[activeMarkerIndex].setAnimation(google.Animation.BOUNCE)

  //     this.recenterMap(selected.location)
  //   } else if (google !== null && selected === null) {
  //     map.fitBounds(bounds)
  //     map.setCenter(bounds.getCenter())
  //   }
  // }

  render() {
    console.log(this.props)
    return (
      <div id='map' role='application' aria-roledescription='map for malls list'>
        Loading map...
      </div>
    )
  }
}

export default Map
