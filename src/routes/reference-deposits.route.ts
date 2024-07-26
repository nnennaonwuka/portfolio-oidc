import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import ReferenceDepositsController from "@/controllers/reference-deposits.controller";

class ReferenceDepositsRoute implements Routes {
  public path = "/reference-deposits";
  public router = Router();
  public ReferenceDepositsController = new ReferenceDepositsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.ReferenceDepositsController.getReferenceDepositss
    );
    // this.router.post(
    //   `${this.path}/upload`,
    //   this.ReferenceDepositsController.uploadReferenceDepositsList
    // );
    this.router.get(
      `${this.path}/download`,
      this.ReferenceDepositsController.downloadReferenceDepositsList
    );
  }
}

export default ReferenceDepositsRoute;
