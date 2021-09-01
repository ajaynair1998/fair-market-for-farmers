import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

import './dragableLocation.css'

const googleMapsApi = process.env.REACT_APP_MAPS_API_KEY




const mapStyles =
{

    width: '100%',
    height: '100%',

}

const containerStyle = {
    maxWidth: "450px",
    maxHeight: "350px"
};

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





    onMarkerDragEnd = (coord) =>
    {
        let { latLng } = coord

        let lat = latLng.lat()
        let lng = latLng.lng()
        console.log(lat, lng)

        // when dragging marker this function
        // will change the location value in
        // parent's state
        this.props.handleDragPointer(lat, lng)





    };

    render()
    {
        return (
            <div className='mapContainer'>
                <Map

                    google={this.props.google}
                    zoom={5}
                    style={mapStyles}
                    containerStyle={containerStyle}
                    initialCenter={
                        this.state.activeMarker
                    }



                >
                    <Marker

                        name={"Custom Marker"}
                        onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                        draggable={true}

                    />


                </Map>
            </div>
        );
    }



}



export default GoogleApiWrapper({
    apiKey: googleMapsApi
})(MapContainer);