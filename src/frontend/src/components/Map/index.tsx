import React from 'react'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import './style.css'
import { Lot } from '../../types'
import { useNavigate } from 'react-router-dom';


const Map = ({ lots }: { lots: Lot[] }) => {
  const navigate = useNavigate()
  if (process.env.REACT_APP_GOOGLE_MAPS_API_KEY === undefined) {
    throw new Error("No Google Maps API Key found in .env file");
  }
  if (lots.length === 0) {
    throw new Error("No lots found");
  }
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });
  const center = {
    lat: 37.2296,
    lng: -80.4139
  }

  if (!isLoaded || lots.length === 0) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className='map shadow-2xl rounded-2xl'>
      <GoogleMap zoom={12} center={center} mapContainerClassName='map-container'>
        {/* marker for each lot */}
        {lots.map((lot) => {
          return (
            <MarkerF
              key={lot.id}
              // position={{ lat: 50, lng: 90 }}
              position={{ lat: lot.lat, lng: lot.lng }}
              icon={{
                url: '/parking-trans-gray.png',
                scaledSize: new window.google.maps.Size(50, 50),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(25, 45)
              }}
              onClick={() => {
                console.log(lot);
                navigate(`/lots/${lot.id}`)
              }}
            />

          )
        })}



      </GoogleMap >
    </div >
  );

}

export default Map