import React from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'

import './dragableLocation.css'

const googleMapsApi = process.env.REACT_APP_MAPS_API_KEY




const mapStyles =
{
    width: '100%',
    height: '100%'
}

export class MapContainer extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            showingInfoWindow: false,
            activeMarker: {
                lat: 9.935881569983913,
                lng: 76.28556501757528
            },
            selectedPlace: {}
        }

        // custom functions
        this.onMarkerDragEnd = this.onMarkerDragEnd.bind(this)

    }




    onMarkerDragEnd = (e) =>
    {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        this.setState(prevState =>
        {
            return { ...prevState, activeMarker: { lat: lat, lng: lng } }
        })
        // when dragging marker this function
        // will change the location value in
        // parent's state
        // changelocationofparent is a function which is passed down from parent
        // this.props.changeLocationOfParent({lat:lat,lng:lng})
    };

    render()
    {
        return (
            <Map
                google={this.props.google}
                zoom={5}
                style={mapStyles}
                initialCenter={
                    this.state.activeMarker
                }
            >
                <Marker

                    name={`lattitude : ${this.state.activeMarker.lat} longitude : ${this.state.activeMarker.lng}`}
                    onDragEnd={(e) => this.onMarkerDragEnd(e)}
                    draggable={true}
                />

            </Map>
        );
    }



}



export default GoogleApiWrapper({
    apiKey: googleMapsApi
})(MapContainer);