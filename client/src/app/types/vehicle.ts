export enum EVehicleType {
  Tractor = "tractor",
  Drone = "drone",
}

export enum EStatusType {
  Unreachable = "unreachable",
  Idle = "idle",
  OnMission = "on-mission"
}

type Coordinates = {latitude: number, longitude: number, updatedAt: string};

export interface IVehicle {
  _id: string;
  type: EVehicleType;
  createdAt: string;
  updatedAt: string;
  status: EStatusType;
  location: Coordinates;
}
