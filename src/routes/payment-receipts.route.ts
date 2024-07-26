import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import PaymentReceiptDownloadController from "@/controllers/payment-receipts.controller";

//temporally saves file to be uploaded to uploads folder

class ReceiptPaymentDownloadRoute implements Routes {
  public path = "/receipt-download";
  public router = Router();
  public paymentReceiptDownloadController =
    new PaymentReceiptDownloadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.paymentReceiptDownloadController.downloadObjectName
    );
  }
}

export default ReceiptPaymentDownloadRoute;
