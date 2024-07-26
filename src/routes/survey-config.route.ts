import { Router } from "express";
import SurveyConfigController from "@controllers/survey-config.controller";
import { SurveyConfigDto } from "@dtos/survey-config.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class SurveyConfigRoute implements Routes {
  public path = "/survey-config";
  public router = Router();
  public surveyConfigController = new SurveyConfigController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.surveyConfigController.uploadSurveyConfigList
    );
    this.router.get(
      `${this.path}/download`,
      this.surveyConfigController.downloadSurveyConfigList
    );
    this.router.get(
      `${this.path}`,
      this.surveyConfigController.getSurveyConfig
    );
    this.router.get(
      `${this.path}/:id(\\d+)`,
      this.surveyConfigController.getSurveyConfigById
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(SurveyConfigDto, "body"),
      this.surveyConfigController.createSurveyConfig
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(SurveyConfigDto, "body", true),
      this.surveyConfigController.updateSurveyConfig
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      this.surveyConfigController.deleteSurveyConfig
    );
  }
}

export default SurveyConfigRoute;
