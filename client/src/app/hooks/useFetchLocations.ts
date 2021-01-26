import React from "react";
import api from "../services/api-service";
import { IGetVehicleResponse } from "../types/response-types";
import { IVehicle } from "../types/vehicle";

export function useFetchLocations() {
  const [vehicles, setVehicles] = React.useState<IVehicle[]>([]);

  React.useEffect(() => {
    async function fetchLocations() {
      let { data } = await api.get<IGetVehicleResponse>('/vehicles');

      setVehicles(data);
    }

    fetchLocations();
  }, [setVehicles]);

  return vehicles;
}
