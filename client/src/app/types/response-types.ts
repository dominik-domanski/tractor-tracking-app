import { IVehicle } from "./vehicle";

export interface IGetVehicleResponse {
    data: IVehicle[];
    // error also should be more informative
    error: string;
}