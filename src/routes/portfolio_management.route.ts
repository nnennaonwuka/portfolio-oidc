import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import PortfolioManagementAssignmentController from "@/controllers/portfolio_management.controller";

class PortfolioManagementAssignmentRoute implements Routes {
  public path = "/portfolio-management-assignment";
  public router = Router();
  public PortfolioManagementAssignmentController =
    new PortfolioManagementAssignmentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //   this.router.post(
    //     `${this.path}/upload`,
    //     this.PortfolioManagementAssignmentController.syncUpPortfolioManagementAssignment
    //   );
    this.router.get(
      `${this.path}/download`,
      this.PortfolioManagementAssignmentController
        .syncDownPortfolioManagementAssignment
    );

    this.router.get(
      `${this.path}/download/get-assigned-tgs`,
      this.PortfolioManagementAssignmentController.downloadDefaultingTgs
    );

    this.router.get(
      `${this.path}/download/get-pcs-assignment`,
      this.PortfolioManagementAssignmentController.downloadPcsAssignment
    );
  }
}

export default PortfolioManagementAssignmentRoute;
