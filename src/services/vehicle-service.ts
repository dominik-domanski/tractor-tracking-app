import { getRandomLocation } from "../data/vehicle-data";
import { IVehicleService } from "../interfaces";
import { IVehicle } from "../types/vehicle";

const mockError = false;
export default class VehicleService implements IVehicleService {
  private static instance: VehicleService;

  private constructor() {
    // database service should be here, but we have mock
  }

  static getInstance(): VehicleService {
    if (!VehicleService.instance) {
      VehicleService.instance = new VehicleService();
    }

    return VehicleService.instance;
  }

  async getVehicles(): Promise<IVehicle[]> {
    return new Promise((resolve, reject) => {
      if (!mockError) {
        resolve(getRandomLocation());
      } else {
        const reason = new Error("Failed to fetch vehicles");
        reject(reason);
      }
    });
  }
}
