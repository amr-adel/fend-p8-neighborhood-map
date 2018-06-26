import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

class Map extends Component {

    state = {
        map: null,
        markers: [],
        google: null
    }

    componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) {
            if (isScriptLoadSucceed) {
                var map = new window.google.maps.Map(document.getElementById('map'), {
                    zoom: 11,
                    center: { lat: 30.0444, lng: 31.2357 }
                });

                this.setState({ map: map, google: window.google.maps })

            }
            else console.log('Can\'t load Google Maps')
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
                gmapId: mall.gmapId
            })

            // marker.addListener('click', () => this.recenterMap(mall.coor))


            this.state.markers.push(marker)
        })
    }

    recenterMap = function (coor) {
        this.state.map.setZoom(13)
        this.state.map.setCenter(coor)
    }

    componentDidUpdate(prevProps, prevState) {

        if(this.state.google !== prevState.google) {
            this.updateMarkers(this.props.filteredMalls)
        }

        if (this.state.google !== null && this.props.filteredMalls.length !== prevProps.filteredMalls.length) {
            this.updateMarkers(this.props.filteredMalls)
        }

        if (this.props.selected !== null) {

            this.state.markers.map(marker => marker.setAnimation(null))

            const activeMarkerIndex = this.state.markers.map(marker => marker.gmapId).indexOf(this.props.selected.gmapId)

            this.state.markers[activeMarkerIndex].setAnimation(this.state.google.Animation.BOUNCE)

            // this.recenterMap(this.props.selected.coor)
        }

    }

    render() {


        return (
            <div id='map'>
                Loading map...
            </div>
        )
    }
}

export default scriptLoader(
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCA5F0pGoVUQo0ZTtUInz6Kd_XfmOW3rAI'
)(Map)