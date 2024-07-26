import { Router } from "express";
import SurveyAnswerController from "@controllers/survey-answer.controller";
import { Routes } from "@interfaces/routes.interface";

class SurveyAnswerRoute implements Routes {
  public path = "/survey-answer";
  public router = Router();
  public surveyAnswerController = new SurveyAnswerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.surveyAnswerController.uploadSurveyAnswerList
    );
    this.router.get(
      `${this.path}/download`,
      this.surveyAnswerController.downloadSurveyAnswerList
    );
  }
}

export default SurveyAnswerRoute;
