import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import VisitationInformationController from "@/controllers/visitation-information.controller";

class VisitationInformationRoute implements Routes {
  public path = "/visitation-information";
  public router = Router();
  public visitationInformationController =
    new VisitationInformationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.visitationInformationController.getAllVisitationInformation
    );
    this.router.post(
      `${this.path}/upload`,
      this.visitationInformationController.syncUpVisitationInformation
    );
    this.router.get(
      `${this.path}/download`,
      this.visitationInformationController.syncDownVisitationInformation
    );
  }
}

export default VisitationInformationRoute;
