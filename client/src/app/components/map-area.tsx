import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { VehicleMarker } from './vehicle-marker'
import { useInterval } from '../hooks/useInterval'
import { IVehicle } from '../types/vehicle'
import api from '../services/api-service'
import { IGetVehicleResponse } from '../types/response-types'
const DELAY = 1000;

export const MapArea = () => {
  const [locations, setLocations] = useState<IVehicle[]>([])

 useEffect(() => {
  fetchLocations();
 }, [])

  useInterval(() => {
    fetchLocations();
  }, DELAY);

  // this could be a redux action and we could get locations with useSelector
  async function fetchLocations() {
    let { data } = await api.get<IGetVehicleResponse>('/vehicles');
    setLocations(data);
  }

  return (
    <MapContainer center={[37.4224764, -122.0842499]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { locations.map(vehicleLocationData => {
        const { _id } = vehicleLocationData;
        return <VehicleMarker vehicleLocationData={vehicleLocationData} key={_id} />
      })}
    </MapContainer>
  )
}
