import { Router } from "express";
import SocialCallLogController from "@controllers/social-call-log.controller";
import { Routes } from "@interfaces/routes.interface";

class SurveyLogRoute implements Routes {
  public path = "/social-call-log";
  public router = Router();
  public socialCallLogController = new SocialCallLogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.socialCallLogController.uploadSocialCallList
    );
    this.router.get(
      `${this.path}/download`,
      this.socialCallLogController.downloadSocialCallList
    );
  }
}

export default SurveyLogRoute;
