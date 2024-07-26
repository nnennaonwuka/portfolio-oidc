import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import DepositsController from "@/controllers/deposits.controller";

class DepositsRoute implements Routes {
  public path = "/deposits";
  public router = Router();
  public DepositsController = new DepositsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.DepositsController.getDepositss);
    this.router.post(
      `${this.path}/upload`,
      this.DepositsController.uploadDepositsList
    );
    this.router.get(
      `${this.path}/download`,
      this.DepositsController.downloadDepositsList
    );
  }
}

export default DepositsRoute;
