import { Router } from "express";
import SurveyQuestionController from "@controllers/survey-question.controller";
import { SurveyQuestionDto } from "@dtos/survey-question.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class SurveyQuestionRoute implements Routes {
  public path = "/survey-question";
  public router = Router();
  public surveyQuestionController = new SurveyQuestionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.surveyQuestionController.uploadSurveyQuestionList
    );
    this.router.get(
      `${this.path}/download`,
      this.surveyQuestionController.downloadSurveyQuestionList
    );
    this.router.get(
      `${this.path}`,
      this.surveyQuestionController.getSurveyQuestion
    );
    this.router.get(
      `${this.path}/:id(\\d+)`,
      this.surveyQuestionController.getSurveyQuestionById
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(SurveyQuestionDto, "body"),
      this.surveyQuestionController.createSurveyQuestion
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(SurveyQuestionDto, "body", true),
      this.surveyQuestionController.updateSurveyQuestion
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      this.surveyQuestionController.deleteSurveyQuestion
    );
  }
}

export default SurveyQuestionRoute;
