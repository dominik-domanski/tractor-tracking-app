import { IVehicle } from "../types/vehicle";

export interface IVehicleService {
  getVehicles(): Promise<IVehicle[]>;
}
