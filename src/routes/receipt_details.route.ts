import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import ReceiptDetailsController from "@/controllers/receipt_details.controller";

class ReceiptDetailsRoute implements Routes {
  public path = "/receipt-details";
  public router = Router();
  public ReceiptDetailsController = new ReceiptDetailsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.ReceiptDetailsController.getReceiptDetails
    );
    this.router.post(
      `${this.path}/upload`,
      this.ReceiptDetailsController.uploadReceiptDetailsList
    );
    this.router.get(
      `${this.path}/download`,
      this.ReceiptDetailsController.downloadReceiptDetailsList
    );
  }
}

export default ReceiptDetailsRoute;
