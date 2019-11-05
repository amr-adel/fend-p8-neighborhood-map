import React, { Component } from 'react'

class Map extends Component {
  state = {
    markers: []
  }

  updateMarkers = (malls, prevMalls) => {
    const { markers } = this.state
    const { map } = this.props
    const { maps } = window.google

    if (!markers.length) {
      let marker
      let tempMarkers = []

      malls.forEach(mall => {
        const position = { lat: mall.location.lat, lng: mall.location.lng }

        let marker = new maps.Marker({
          position,
          animation: maps.Animation.DROP,
          map: map,
          id: mall.id
        })

        tempMarkers.push(marker)
      })

      this.setState({ markers: tempMarkers })
    }

    if (malls.length < prevMalls.length) {
      const mallsIds = malls.map(mall => mall.id)
      const prevMallsIds = prevMalls.map(mall => mall.id)
      const mallsRemoved = prevMallsIds.filter(id => mallsIds.indexOf(id) === -1)
      markers.forEach(marker => {
        if (mallsRemoved.indexOf(marker.id) !== -1) marker.setMap(null)
      })
    } else if (malls.length > prevMalls.length) {
      const mallsIds = malls.map(mall => mall.id)
      const prevMallsIds = prevMalls.map(mall => mall.id)
      const mallsAdded = mallsIds.filter(id => prevMallsIds.indexOf(id) === -1)
      markers.forEach(marker => {
        if (mallsAdded.indexOf(marker.id) !== -1) marker.setMap(map)
      })
    }
  }

  // updateMarkers = function(malls) {
  //   const { markers, google, map, bounds } = this.state

  //   markers.map(marker => marker.setMap(null))

  //   let marker
  //   let newMarkers = []

  //   malls.forEach(mall => {
  //     marker = new google.Marker({
  //       position: mall.location,
  //       animation: google.Animation.DROP,
  //       map: map,
  //       id: mall.id
  //     })

  //     marker.addListener('click', () => this.selectMall(mall))

  //     bounds.extend(mall.location)

  //     newMarkers.push(marker)
  //   })

  //   this.setState({ markers: newMarkers })

  //   map.fitBounds(bounds)
  //   map.setCenter(bounds.getCenter())
  // }

  // selectMall(mall) {
  //   if (mall !== this.props.selected) this.props.selectMall(mall)
  // }

  recenterMap = (location = { lat: 30.0444, lng: 31.2357 }, zoom = 11) => {
    const { map } = this.props
    map.setZoom(zoom)
    map.setCenter(location)
  }

  activateMarker = marker => {
    marker.setAnimation(1)
    this.recenterMap(marker.position, 15)
  }

  deactivateMarker = marker => {
    marker.setAnimation(5)
  }

  componentDidUpdate(prevProps) {
    const { maps } = window.google
    const { filteredList, selectedId, map } = this.props
    const { markers } = this.state

    if (maps && map) {
      if (filteredList.length !== prevProps.filteredList.length) {
        this.updateMarkers(filteredList, prevProps.filteredList)
      }

      if (selectedId !== null) {
        markers.forEach(marker => {
          marker.id === selectedId ? this.activateMarker(marker) : this.deactivateMarker(marker)
        })
      } else {
        markers.forEach(marker => this.deactivateMarker(marker))
        this.recenterMap()
      }
    }

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
  }

  render() {
    return (
      <div id='map' role='application' aria-roledescription='map for malls list'>
        Loading map...
      </div>
    )
  }
}

export default Map
