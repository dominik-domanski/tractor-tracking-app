import { EStatusType, EVehicleType } from "../types/vehicle";

export const DUMMY_VEHICLE = {
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

export const getRandomLocation = () => {
  const {
    location: { latitude, longitude },
  } = DUMMY_VEHICLE;

  const newLatitude = latitude + (Math.random() * 0.5 - 0.25) * 0.001;
  const newLongitude = longitude + (Math.random() * 1 - 0.5) * 0.001;
  DUMMY_VEHICLE.location.latitude = newLatitude;
  DUMMY_VEHICLE.location.longitude = newLongitude;

  return [DUMMY_VEHICLE];
};
