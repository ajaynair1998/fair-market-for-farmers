import React from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'

import './index.css'




const mapStyles =
{
    width: '100%',
    height: '100%'
}

export class MapContainer extends React.Component
{
    constructor()
    {
        super()

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }

        // custom functions
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onClose = this.onClose.bind(this)
    }

    onMarkerClick(props, marker, event)
    {
        this.setState(prevState =>
        {
            return {
                ...prevState,
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true
            }
        })

    }

    onClose(props)
    {
        if (this.state.showingInfoWindow)
        {
            this.setState(prevState =>
            {
                return {
                    ...prevState,
                    showingInfoWindow: false,
                    activeMarker: null
                }
            })
        }
    }






    render()
    {
        return (
            <Map
                className='mapsContainer'
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={
                    {
                        lat: 9.46084,
                        lng: 76.36935
                    }
                }
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Kenyatta International Convention Centre'}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>

            </Map>
        )
    }
}

const googleMapsApi=process.env.REACT_APP_MAPS_API_KEY

export default GoogleApiWrapper({
    apiKey: googleMapsApi
})(MapContainer);