import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import BankCardVerificationController from "@/controllers/bank_card_verification.controller";
import validationMiddleware from "@/middlewares/validation.middleware";
import { VerifyCardsDto } from "@/dtos/verify-card.dto";

class BankCardVerificationRoute implements Routes {
  public path = "/bank_card_verification";  
  public webPath = "/web/bank_card_verification";
  public router = Router();
  public BankCardVerificationController =
    new BankCardVerificationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.BankCardVerificationController.synchronizeUp
    );
    this.router.get(
      `${this.path}/download`,
      this.BankCardVerificationController.synchronizeDown
    );
    this.router.post( `${this.webPath}/verify-card`, validationMiddleware(VerifyCardsDto),
    this.BankCardVerificationController.verifyCard);
   
  }
}

export default BankCardVerificationRoute;
