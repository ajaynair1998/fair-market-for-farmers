import React from 'react';


const mapStyles = {
    map: {

        width: '100%',
        height: '100%'
    }
};

class CurrentLocation extends React.Component
{
    constructor()
    {
        super()
        this.state = {}
    }
    render()
    {
        return(
            <div>hi</div>
        )
    }
}

// dedault props for CurrentLocation component
CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233
  },
  centerAroundCurrentLocation: false,
  visible: true
};

export default CurrentLocation;



