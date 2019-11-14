import React, { Component } from "react";

class Map extends Component {
  state = {
    bounds: null,
    markers: []
  };

  updateMarkers = (malls, prevMalls) => {
    const { markers } = this.state;
    const { map, setSelected } = this.props;
    const { maps } = window.google;

    if (!markers.length) {
      let tempMarkers = [];

      malls.forEach(mall => {
        let marker;
        const position = { lat: mall.location.lat, lng: mall.location.lng };

        marker = new maps.Marker({
          position,
          animation: maps.Animation.DROP,
          map: map,
          id: mall.id
        });

        var infowindow = new maps.InfoWindow({
          content: `<h4>${mall.name}</h4>`
        });

        marker.addListener("click", () => setSelected(mall));
        marker.addListener("mouseover", () => infowindow.open(map, marker));
        marker.addListener("mouseout", () => infowindow.close());

        tempMarkers.push(marker);
      });

      this.setState({ markers: tempMarkers });
    }

    const mallsIds = malls.map(mall => mall.id);
    const prevMallsIds = prevMalls.map(mall => mall.id);

    if (malls.length < prevMalls.length) {
      const mallsRemoved = prevMallsIds.filter(
        id => mallsIds.indexOf(id) === -1
      );
      markers.forEach(marker => {
        if (mallsRemoved.indexOf(marker.id) !== -1) marker.setMap(null);
      });
    } else if (malls.length > prevMalls.length) {
      const mallsAdded = mallsIds.filter(id => prevMallsIds.indexOf(id) === -1);
      markers.forEach(marker => {
        if (mallsAdded.indexOf(marker.id) !== -1) marker.setMap(map);
      });
    }
  };

  fitBounds = async places => {
    const { maps } = window.google;
    const { map } = this.props;

    const newBounds = await new maps.LatLngBounds();

    this.setState({ bounds: newBounds });

    places.forEach(place => {
      const position = { lat: place.location.lat, lng: place.location.lng };
      this.state.bounds.extend(position);
    });

    map.fitBounds(this.state.bounds);
    map.setCenter(this.state.bounds.getCenter());
  };

  recenterMap = (location = { lat: 30.0444, lng: 31.2357 }, zoom = 11) => {
    const { map } = this.props;
    map.setZoom(zoom);
    map.setCenter(location);
  };

  activateMarker = marker => {
    marker.setAnimation(1);
    this.recenterMap(marker.position, 15);
  };

  deactivateMarker = marker => {
    marker.setAnimation(5);
  };

  componentDidUpdate(prevProps) {
    const { maps } = window.google;
    const { filteredList, setSelected, selectedId, map } = this.props;
    const { markers } = this.state;

    if (maps && map) {
      if (filteredList.length !== prevProps.filteredList.length) {
        this.updateMarkers(filteredList, prevProps.filteredList);
        switch (filteredList.length) {
          case 0:
            this.recenterMap();
            break;
          case 1:
            setSelected(filteredList[0]);
            break;
          default:
            this.fitBounds(filteredList);
        }
      }

      if (selectedId !== prevProps.selectedId) {
        if (selectedId !== null) {
          markers.forEach(marker => {
            marker.id === selectedId
              ? this.activateMarker(marker)
              : this.deactivateMarker(marker);
          });
        } else {
          markers.forEach(marker => this.deactivateMarker(marker));
          if (filteredList.length > 1) this.fitBounds(filteredList);
        }
      }
    }
  }

  render() {
    return (
      <div
        id="map"
        role="application"
        aria-roledescription="map for malls list">
        Loading map...
      </div>
    );
  }
}

export default Map;
