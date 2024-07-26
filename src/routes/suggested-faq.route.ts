import { Router } from "express";
import SuggestedFaqController from "@controllers/suggested-faq.controller";
import { Routes } from "@interfaces/routes.interface";

class SuggestedFaqRoute implements Routes {
  public path = "/suggested-faq";
  public router = Router();
  public suggestedFaqController = new SuggestedFaqController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.suggestedFaqController.uploadSuggestedFaqList
    );
    this.router.get(
      `${this.path}/download`,
      this.suggestedFaqController.downloadSuggestedFaqList
    );
  }
}

export default SuggestedFaqRoute;
