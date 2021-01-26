import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet'
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
    <div className="map-wrapper">
      <MapContainer center={[-21.75553, -46.56020]} zoom={13} scrollWheelZoom={false}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap.DarkMode">
            <TileLayer
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
              url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          {locations.map(vehicleLocationData => {
            const { _id } = vehicleLocationData;
            return <VehicleMarker vehicleLocationData={vehicleLocationData} key={_id} />
          })}
        </LayersControl>
      </MapContainer>
    </div>
  )
}
