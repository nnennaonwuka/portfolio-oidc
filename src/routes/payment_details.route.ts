import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import PaymentDetailsController from "@/controllers/payment_details.controller";

class PaymentDetailsRoute implements Routes {
  public path = "/payment-details";
  public router = Router();
  public paymentDetailsController = new PaymentDetailsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.paymentDetailsController.syncUpPaymentDetails
    );
    this.router.get(
      `${this.path}/download`,
      this.paymentDetailsController.syncDownPaymentDetails
    );
  }
}

export default PaymentDetailsRoute;
