import { Router } from "express";
import SurveyLogController from "@controllers/survey-log.controller";
import { Routes } from "@interfaces/routes.interface";

class SurveyLogRoute implements Routes {
  public path = "/survey-log";
  public router = Router();
  public surveyLogController = new SurveyLogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.surveyLogController.uploadSurveyLogList
    );
    this.router.get(
      `${this.path}/download`,
      this.surveyLogController.downloadSurveyLogList
    );
  }
}

export default SurveyLogRoute;
