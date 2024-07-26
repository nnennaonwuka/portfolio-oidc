import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import VisitationQuestionsController from "@/controllers/visitation-questions.controller";

class VisitationQuestionsRoute implements Routes {
  public path = "/visitation-questions";
  public router = Router();
  public visitationQuestionsController = new VisitationQuestionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.visitationQuestionsController.getAllVisitationQuestions
    );
    this.router.post(
      `${this.path}/upload`,
      this.visitationQuestionsController.syncUpVisitationQuestions
    );
    this.router.get(
      `${this.path}/download`,
      this.visitationQuestionsController.syncDownVisitationQuestions
    );
  }
}

export default VisitationQuestionsRoute;
