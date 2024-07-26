import { Router } from "express";
import NewMemberDetailsController from "@controllers/new-member-details.controller";
import { Routes } from "@interfaces/routes.interface";

class NewMemberDetailsRoute implements Routes {
  public path = "/new-member-details";
  public router = Router();
  public newMemberDetailsController = new NewMemberDetailsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.newMemberDetailsController.uploadNewMemberDetailsList
    );
    this.router.get(
      `${this.path}/download`,
      this.newMemberDetailsController.downloadNewMemberDetailsList
    );
  }
}

export default NewMemberDetailsRoute;
