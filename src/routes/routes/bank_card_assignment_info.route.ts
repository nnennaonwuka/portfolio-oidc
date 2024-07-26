import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import BankCardAssignmentInfoController from "@controllers/bank_card_assignment_info.controller";

class BankCardAssignmentInfoRoute implements Routes {
  public path = "/bank_card_assignment_info";
  public router = Router();
  public BankCardAssignmentInfoController =
    new BankCardAssignmentInfoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.BankCardAssignmentInfoController.synchronizeUp
    );
    this.router.get(
      `${this.path}/download`,
      this.BankCardAssignmentInfoController.synchronizeDown
    );
  }
}

export default BankCardAssignmentInfoRoute;
