import { Router } from "express";
import PaymentTransactionsController from "@controllers/payment-transactions.controller";
import { Routes } from "@interfaces/routes.interface";

class PaymentTransactionsRoute implements Routes {
  public path = "/payment-transactions";
  public router = Router();
  public PaymentTransactionsController = new PaymentTransactionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.PaymentTransactionsController.uploadPaymentTransactionsList
    );
    this.router.get(
      `${this.path}/download`,
      this.PaymentTransactionsController.downloadPaymentTransactionsList
    );
    this.router.get(
      `${this.path}`,
      this.PaymentTransactionsController.getPaymentTransactions
    );
  }
}

export default PaymentTransactionsRoute;
