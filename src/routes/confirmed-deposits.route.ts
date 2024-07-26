import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import ConfirmedDepositsController from "@/controllers/confirmed-deposits.controller";

class ConfirmedDepositsRoute implements Routes {
  public path = "/confirmed-deposits";
  public router = Router();
  public ConfirmedDepositsController = new ConfirmedDepositsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.ConfirmedDepositsController.getConfirmedDepositss
    );
    this.router.post(
      `${this.path}/upload`,
      this.ConfirmedDepositsController.uploadConfirmedDepositsList
    );
    this.router.get(
      `${this.path}/download`,
      this.ConfirmedDepositsController.downloadConfirmedDepositsList
    );
  }
}

export default ConfirmedDepositsRoute;
