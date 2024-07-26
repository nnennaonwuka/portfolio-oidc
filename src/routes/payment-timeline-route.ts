import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import PaymentTimelineController from "@/controllers/payment-timeline.controller";

class PaymentTimelineRoute implements Routes {
  public path = "/payment-timeline";
  public router = Router();
  public paymentTimelineController = new PaymentTimelineController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.paymentTimelineController.getAllPaymentTimeline
    );
    this.router.post(
      `${this.path}/upload`,
      this.paymentTimelineController.syncUpPaymentTimeline
    );
    this.router.get(
      `${this.path}/download`,
      this.paymentTimelineController.syncDownPaymentTimeline
    );
  }
}

export default PaymentTimelineRoute;
