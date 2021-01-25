import { IVehicleService } from "../interfaces";
import { IVehicle, EStatusType, EVehicleType } from "../types/vehicle";

const mockError = false;
const DUMMY_VEHICLE = {
  _id: "1d7df7a80139c9c0312b1121",
  type: EVehicleType.Tractor,
  createdAt: "2020-03-11T17:33:53.119Z",
  updatedAt: "2020-03-11T18:33:53.119Z",
  status: EStatusType.OnMission,
  location: {
    latitude: 37.4224764,
    longitude: -122.0842499,
    updatedAt: "2019-09-15T20:14:02.877Z",
  },
};

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
        resolve([DUMMY_VEHICLE]);
      } else {
        const reason = new Error("Failed to fetch vehicles");
        reject(reason);
      }
    });
  }
}
