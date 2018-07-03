import React, { Component } from 'react'
import Data from "./Data";
import scriptLoader from 'react-async-script-loader'

class Map extends Component {

    state = {
        map: null,
        bounds: null,
        markers: [],
        google: null
    }

    componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) {
            if (isScriptLoadSucceed) {
                var map = new window.google.maps.Map(document.getElementById('map'), {
                    zoom: 11,
                    center: { lat: 30.0444, lng: 31.2357 },
                    styles: Data.mapStyles,
                    disableDefaultUI: true
                });

                var bounds = new window.google.maps.LatLngBounds();

                this.setState({ map: map, bounds: bounds, google: window.google.maps })

            }
            else alert(`Unable to Load Google Maps`)
        }
    }


    updateMarkers = function (malls) {

        this.state.markers.map(marker => marker.setMap(null))
        this.state.markers = []

        let marker;

        malls.forEach(mall => {
            marker = new this.state.google.Marker({
                position: mall.coor,
                animation: this.state.google.Animation.DROP,
                map: this.state.map,
                fsId: mall.fsId
            })

            marker.addListener('click', () => this.selectMall(mall))

            this.state.bounds.extend(mall.coor)

            this.state.markers.push(marker)
        })

        this.state.map.fitBounds(this.state.bounds)
        this.state.map.setCenter(this.state.bounds.getCenter())

    }

    selectMall(mall) {
        if (mall !== this.props.selected) this.props.selectMall(mall) 
    }

    recenterMap = function (coor) {
        this.state.map.setZoom(15)
        this.state.map.setCenter(coor)
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.google !== prevState.google) {
            this.updateMarkers(this.props.filteredMalls)
        }

        if (this.state.google !== null && this.props.filteredMalls.length !== prevProps.filteredMalls.length) {
            this.updateMarkers(this.props.filteredMalls)
        }

        this.state.markers.map(marker => marker.setAnimation(null))

        if (this.props.selected !== null && this.state.markers) {

            const activeMarkerIndex = this.state.markers.map(marker => marker.fsId).indexOf(this.props.selected.fsId)
            this.state.markers[activeMarkerIndex].setAnimation(this.state.google.Animation.BOUNCE)

            this.recenterMap(this.props.selected.coor)
        } else if (this.state.google !== null && this.props.selected === null) {

            this.state.map.fitBounds(this.state.bounds)
            this.state.map.setCenter(this.state.bounds.getCenter())
        }

    }

    render() {


        return (
            <div id='map' role="application" aria-roledescription="map for malls list">
                Loading map...
            </div>
        )
    }
}

export default scriptLoader(
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCA5F0pGoVUQo0ZTtUInz6Kd_XfmOW3rAI'
)(Map)