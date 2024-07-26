import { Router } from "express";
import PaymentTrackerController from "@controllers/payment-tracker.controller";
import { Routes } from "@interfaces/routes.interface";

class PaymentTrackerRoute implements Routes {
  public path = "/payment-tracker";
  public router = Router();
  public PaymentTrackerController = new PaymentTrackerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.PaymentTrackerController.uploadPaymentTrackerList
    );
    this.router.get(
      `${this.path}/download`,
      this.PaymentTrackerController.downloadPaymentTrackerList
    );
    this.router.get(
      `${this.path}`,
      this.PaymentTrackerController.getPaymentTracker
    );
  }
}

export default PaymentTrackerRoute;
