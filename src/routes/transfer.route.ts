import { Router } from "express";
import TransferController from "@controllers/transfer.controller";
import { Routes } from "@interfaces/routes.interface";

class TransferRoute implements Routes {
  public path = "/transfer";
  public router = Router();
  public transferController = new TransferController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.transferController.uploadTransferList
    );
    this.router.get(
      `${this.path}/download`,
      this.transferController.downloadTransferList
    );
  }
}
export default TransferRoute;
