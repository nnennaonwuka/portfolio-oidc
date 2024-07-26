import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import TransferDetailsController from "@/controllers/transfer-details.controller";

class TransferDetailsRoute implements Routes {
  public path = "/transfer-details";
  public router = Router();
  public transferDetailsController = new TransferDetailsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.transferDetailsController.syncUpTransferDetails
    );
    this.router.get(
      `${this.path}/download`,
      this.transferDetailsController.syncDownTransferDetails
    );
  }
}

export default TransferDetailsRoute;
