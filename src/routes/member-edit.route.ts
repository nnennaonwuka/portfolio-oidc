import { Router } from "express";
import MemberEditController from "@controllers/member-edit.controller";
import { MemberEditDto } from "@dtos/member-edit.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class MemberEditRoute implements Routes {
  public path = "/member-edit";
  public router = Router();
  public memberEditController = new MemberEditController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.memberEditController.uploadMemberEditList
    );
    this.router.get(
      `${this.path}/download`,
      this.memberEditController.downloadMemberEditList
    );
  }
}

export default MemberEditRoute;
