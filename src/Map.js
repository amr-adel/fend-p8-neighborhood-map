import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

class Map extends Component {

    state = {
        map: null
    }

    componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) {
            if (isScriptLoadSucceed) {
                var map = new window.google.maps.Map(document.getElementById('map'), {
                    zoom: 11,
                    center: { lat: 30.0444, lng: 31.2357 }
                });

                this.setState({ map: map })

            }
            else this.props.onError()
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