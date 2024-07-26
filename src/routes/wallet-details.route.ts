import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import WalletDetailsController from "@/controllers/wallet-details.controller";

class WalletDetailsRoute implements Routes {
  public path = "/wallet-details";
  public router = Router();
  public WalletDetailsController = new WalletDetailsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.WalletDetailsController.getWalletDetails
    );
    // this.router.post(
    //   `${this.path}/upload`,
    //   this.OperatorWalletDetailsController.uploadOperatorWalletDetailsList
    // );
    this.router.get(
      `${this.path}/download`,
      this.WalletDetailsController.downloadStaffWalletDetailsList
    );
    this.router.get(
      `${this.path}/download-tgs`,
      this.WalletDetailsController.downloadTgWalletDetailsList
    );
  }
}

export default WalletDetailsRoute;
