import { IVehicleService } from "../interfaces";
import { EStatusType, EVehicleType, IVehicle } from "../types/vehicle";

const mockError = false;
export const DUMMY_VEHICLE = {
  _id: "1d7df7a80139c9c0312b1121",
  type: EVehicleType.Tractor,
  createdAt: "2020-03-11T17:33:53.119Z",
  updatedAt: "2020-03-11T18:33:53.119Z",
  status: EStatusType.OnMission,
  location: {
    latitude: -21.75553,
    longitude: -46.56020,
    updatedAt: "2019-09-15T20:14:02.877Z",
  },
};
export default class VehicleService implements IVehicleService {
  private static instance: VehicleService;

  private constructor() {
    // database service should be here, but we have mock
  }

  getRandomLocation(): IVehicle[] {
    const {
      location: { latitude, longitude },
    } = DUMMY_VEHICLE;
  
    const newLatitude = latitude + (Math.random() * 0.5 - 0.25) * 0.001;
    const newLongitude = longitude + (Math.random() * 1 - 0.5) * 0.001;
    DUMMY_VEHICLE.location.latitude = newLatitude;
    DUMMY_VEHICLE.location.longitude = newLongitude;
  
    return [DUMMY_VEHICLE];
  };

  static getInstance(): VehicleService {
    if (!VehicleService.instance) {
      VehicleService.instance = new VehicleService();
    }

    return VehicleService.instance;
  }

  async getVehicles(): Promise<IVehicle[]> {
    return new Promise((resolve, reject) => {
      if (!mockError) {
        resolve(this.getRandomLocation());
      } else {
        const reason = new Error("Failed to fetch vehicles");
        reject(reason);
      }
    });
  }
}
