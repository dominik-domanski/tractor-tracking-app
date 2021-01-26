import express, { Application } from "express";
import { IControllerBase } from "./interfaces";
import { VehicleController } from "./controllers";
const ALLOWED_ORIGINS: string[] = ["http://localhost:8080"];
import bodyParser from "body-parser";
import { IApplication, TApplicationOptions } from "./interfaces";

class App implements IApplication {
  public app: Application;

  public port: number | string;

  constructor({ port }: TApplicationOptions) {
    this.app = express();
    this.port = port;
    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use((request, response, next) => {
      const {
        headers: { origin },
      } = request;
      if (origin && ALLOWED_ORIGINS.includes(origin)) {
        response.setHeader("Access-Control-Allow-Origin", origin);
      }
      response.header(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,PATCH, OPTIONS"
      );
      response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      response.header("Access-Control-Allow-Credentials", "true");
      next();
    });
  }

  private initRoutes(): void {
    const ctrls: IControllerBase[] = [
      // other controllers but Vehicle can be here as well
      new VehicleController(),
    ];
    ctrls.forEach((ctrl: IControllerBase) =>
      this.app.use(ctrl.path, ctrl.router)
    );
  }

  public serve(): void {
    this.app.listen(this.port, () =>
      console.log(`application is listening on port ${this.port}`)
    );
  }
}

export default App;
