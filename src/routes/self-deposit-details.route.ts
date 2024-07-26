import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import SelfDepositDetailsController from "@/controllers/self-deposit-details.controller";

class SelfDepositDetailsRoute implements Routes {
  public path = "/self-deposit-details";
  public router = Router();
  public selfDepositDetailsController = new SelfDepositDetailsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.selfDepositDetailsController.getAllSelfDepositDetails
    );
    this.router.post(
      `${this.path}/upload`,
      this.selfDepositDetailsController.syncUpSelfDepositDetails
    );
    this.router.get(
      `${this.path}/download`,
      this.selfDepositDetailsController.syncDownSelfDepositDetails
    );
    this.router.get(
      `${this.path}/id`,
      this.selfDepositDetailsController.getSelfDepositDetailsById
    );
    this.router.put(
      `${this.path}/id`,
      this.selfDepositDetailsController.updateSelfDepositDetails
    );
  }
}

export default SelfDepositDetailsRoute;
