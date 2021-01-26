import { IVehicle } from "./vehicle";

export interface VehicleBody {
    vehicle: IVehicle;
  }
  
  // instead of any we can add more types in future
  export type RequestBodyType = VehicleBody | any;