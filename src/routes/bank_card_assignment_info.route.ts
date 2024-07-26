import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import BankCardAssignmentInfoController from "@controllers/bank_card_assignment_info.controller";

class BankCardAssignmentInfoRoute implements Routes {
  public path = "/bank_card_assignment_info";
  public webPath="/web/cards"
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
    this.router.get(
      `${this.webPath}/status-stats`,
      this.BankCardAssignmentInfoController.statusStats
    );
    this.router.get(
      `${this.webPath}`,
      this.BankCardAssignmentInfoController.getCards
    );
    // this.router.get(
    //   `${this.webPath}/details`,
    //   this.BankCardAssignmentInfoController.cardDetails
    // );
    this.router.get(
      `${this.webPath}/verified/:unique_entity_id/:cardId/:hub/`,
      this.BankCardAssignmentInfoController.handeleVerifiedCardDetails
    );
    this.router.get(
      `${this.webPath}/unverified/:unique_entity_id/:cardId/:hub/`,
      this.BankCardAssignmentInfoController.handleUnverifiedCardDetails
    );
    this.router.get(
      `${this.webPath}/unresolved/:unique_entity_id/:cardId/:hub/`,
      this.BankCardAssignmentInfoController.handleUnresolvedCardDetails
    );
  }
}

export default BankCardAssignmentInfoRoute;
