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
            else console.log('Can\'t reach Google Maps')
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
                id: mall.gmapId
            })

            // marker.addListener('click', () => this.recenterMap(mall.coor))


            this.state.markers.push(marker)
        })
    }

    recenterMap = function (coor) {
        this.state.map.setZoom(13)
        this.state.map.setCenter(coor)
    }

    componentDidUpdate() {
        if (this.props.selected !== null) {
            const activeMarkerIndex = this.state.markers.map(marker => marker.id).indexOf(this.props.selected.gmapId)

            this.state.markers[activeMarkerIndex].setAnimation(this.state.google.Animation.BOUNCE)

            this.recenterMap(this.props.selected.coor)
        }
    }

    render() {

        if (this.state.google !== null) {
            this.updateMarkers(this.props.filteredMalls)
        }

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