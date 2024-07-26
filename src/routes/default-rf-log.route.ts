import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import DefaultRfLogController from "@/controllers/default-rf-log.controller";

class DefaultRfLogRoute implements Routes {
  public path = "/default-rf-log";
  public router = Router();
  public defaultRfLogController = new DefaultRfLogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.defaultRfLogController.getAllDefaultRfLog
    );
    this.router.post(
      `${this.path}/upload`,
      this.defaultRfLogController.syncUpDefaultRfLog
    );
    this.router.get(
      `${this.path}/download`,
      this.defaultRfLogController.syncDownDefaultRfLog
    );
  }
}

export default DefaultRfLogRoute;
