import { Router } from "express";
import StaffGeneratedRfController from "@controllers/staff-generated-rf.controller";
import { Routes } from "@interfaces/routes.interface";

class StaffGeneratedRfRoute implements Routes {
  public path = "/staff-generated-rf";
  public router = Router();
  public staffGeneratedRfController = new StaffGeneratedRfController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.staffGeneratedRfController.uploadStaffGeneratedRfList
    );
    this.router.get(
      `${this.path}/download`,
      this.staffGeneratedRfController.downloadStaffGeneratedRfList
    );
  }
}

export default StaffGeneratedRfRoute;
