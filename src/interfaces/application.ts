import { Application } from "express";

export type TApplicationOptions = {
  port: number | string;
};

export interface IApplication {
  app: Application;
  port: number | string;

  serve(): void;
}
