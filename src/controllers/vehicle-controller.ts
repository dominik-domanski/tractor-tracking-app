import * as express from "express";
import { Request, Response } from "express";
import { IControllerBase, IVehicleService } from "../interfaces";
import VehicleService from "../services/vehicle-service";

class VehicleController implements IControllerBase {
  public path = "/api/";

  public router = express.Router();

  protected vehicleService: IVehicleService;

  constructor() {
    this.vehicleService = VehicleService.getInstance();
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get("/vehicles", this.getVehicles);

    console.log("vehicle routes - initiated");
  }

  getVehicles = async (request: Request, response: Response): Promise<void> => {
    try {
      const vehicles = await this.vehicleService.getVehicles();

      response.status(200).json({ data: vehicles, error: undefined });
    } catch (error) {
      response.status(500).json({ data: null, error: error.message });
    }
  };
}

export default VehicleController;
