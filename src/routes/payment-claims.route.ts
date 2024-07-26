import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import PaymentClaimsController from "@/controllers/payment-claims.controller";

class PaymentClaimsRoute implements Routes {
  public path = "/payment-claims";
  public router = Router();
  public PaymentClaimsController = new PaymentClaimsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.PaymentClaimsController.getPaymentClaims
    );
    this.router.post(
      `${this.path}/upload`,
      this.PaymentClaimsController.uploadPaymentClaimsList
    );
    this.router.get(
      `${this.path}/download`,
      this.PaymentClaimsController.downloadPaymentClaimsList
    );
  }
}

export default PaymentClaimsRoute;
