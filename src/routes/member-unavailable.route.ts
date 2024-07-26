import { Router } from "express";
import MemberUnavailableController from "@controllers/member-unavailable.controller";
import { Routes } from "@interfaces/routes.interface";

class MemberUnavailableRoute implements Routes {
  public path = "/member-unavailable";
  public router = Router();
  public memberUnavailableController = new MemberUnavailableController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.memberUnavailableController.uploadMemberUnavailableList
    );
    this.router.get(
      `${this.path}/download`,
      this.memberUnavailableController.downloadMemberUnavailableList
    );
  }
}

export default MemberUnavailableRoute;
