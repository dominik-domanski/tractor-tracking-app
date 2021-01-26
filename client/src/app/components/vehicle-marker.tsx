import React from 'react'
import { IVehicle } from '../types/vehicle'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const generatePopupChild = (title: string, value: string | number, indent?: boolean) => {
    return <div style={indent ? {marginLeft: '5px'}: {}}>{`${title}: ${value}`}</div>
}

interface IVehicleMarkerProps {
    vehicleLocationData: IVehicle;
  }

export const VehicleMarker = (props: IVehicleMarkerProps) => {
    const {vehicleLocationData : { location, type, status, _id }} = props;
    const { latitude, longitude } = location;
    return (
        <Marker position={[latitude, longitude]}>
        <Popup>
            {generatePopupChild('ID', _id)}
            {generatePopupChild('Type', type)}
            {generatePopupChild('Status', status)}
            <div>Location</div>
            {generatePopupChild('lat', latitude, true)}
            {generatePopupChild('long', longitude, true)}
        </Popup>
      </Marker>
    )
}
