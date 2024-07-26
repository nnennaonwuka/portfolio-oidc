import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import CommissionChargeDetailsController from "@/controllers/commission_charge_details.controller";

class CommissionChargeDetailsRoute implements Routes {
  public path = "/commission-charge-details";
  public router = Router();
  public paymentDetailsController = new CommissionChargeDetailsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.paymentDetailsController.syncUpCommissionChargeDetails
    );
    this.router.get(
      `${this.path}/download`,
      this.paymentDetailsController.syncDownCommissionChargeDetails
    );
  }
}

export default CommissionChargeDetailsRoute;
