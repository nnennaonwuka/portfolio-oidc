import { Router } from "express";
import MemberCollectionCenterUpdateController from "@controllers/member-collection-center-update.controller";
import { MemberCollectionCenterUpdateDto } from "@dtos/member-collection-center-update.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class MemberCollectionCenterUpdateRoute implements Routes {
  public path = "/member-collection-center-update";
  public router = Router();
  public memberCollectionCenterUpdateController =
    new MemberCollectionCenterUpdateController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.memberCollectionCenterUpdateController
        .uploadMemberCollectionCenterUpdateList
    );
    this.router.get(
      `${this.path}/download`,
      this.memberCollectionCenterUpdateController
        .downloadMemberCollectionCenterUpdateList
    );
  }
}

export default MemberCollectionCenterUpdateRoute;
