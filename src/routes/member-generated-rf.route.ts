import { Router } from "express";
import MemberGeneratedRfController from "@controllers/member-generated-rf.controller";
import { Routes } from "@interfaces/routes.interface";

class MemberGeneratedRfRoute implements Routes {
  public path = "/member-generated-rf";
  public router = Router();
  public memberGeneratedRfController = new MemberGeneratedRfController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.memberGeneratedRfController.uploadMemberGeneratedRfList
    );
    this.router.post(
      `${this.path}/update`,
      this.memberGeneratedRfController.updateMemberGeneratedRfFromFarming
    );
    this.router.get(
      `${this.path}/download/per_hub`,
      this.memberGeneratedRfController.downloadMemberGeneratedRfListByHub
    );
    this.router.get(
      `${this.path}/download`,
      this.memberGeneratedRfController.downloadMemberGeneratedRfList
    );
    this.router.get(
      `${this.path}/download/pc`,
      this.memberGeneratedRfController.downloadMemberGeneratedRfPayment
    );
  }
}

export default MemberGeneratedRfRoute;
