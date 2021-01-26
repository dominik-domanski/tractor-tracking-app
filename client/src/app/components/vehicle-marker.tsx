import React from 'react'
import Leaflet from 'leaflet'
import { IVehicle } from '../types/vehicle'
import { Marker, Tooltip } from 'react-leaflet'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTractor } from "@fortawesome/free-solid-svg-icons";
import ReactDOMServer from 'react-dom/server';

const generatePopupChild = (title: string, value: string | number, indent?: boolean) => {
  return <div style={indent ? { marginLeft: '5px' } : {}}>{`${title}: ${value}`}</div>
}

interface IVehicleMarkerProps {
  vehicleLocationData: IVehicle;
}

// here we can change with icon depending on vehicle type and color depending on status
const iconHTML = ReactDOMServer.renderToString(<FontAwesomeIcon size='2x' icon={faTractor} />)
const customMarkerIcon = new Leaflet.DivIcon({
  html: iconHTML,
});

export const VehicleMarker = (props: IVehicleMarkerProps) => {
  const { vehicleLocationData: { location, type, status, _id } } = props;
  const { latitude, longitude } = location;
  return (
    <Marker
      position={[latitude, longitude]}
      icon={customMarkerIcon}
    >
      <Tooltip>
        {generatePopupChild('ID', _id)}
        {generatePopupChild('Type', type)}
        {generatePopupChild('Status', status)}
        <div>Location</div>
        {generatePopupChild('lat', latitude, true)}
        {generatePopupChild('long', longitude, true)}
      </Tooltip>
    </Marker>
  )
}
