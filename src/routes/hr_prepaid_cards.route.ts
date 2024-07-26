import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import HrPrepaidCardsController from "@/controllers/hr_prepaid_cards.controller";

class HrPrepaidCardsRoute implements Routes {
  public path = "/hr-prepaid-cards";  
  public webPath = "/web/preloaded-cards";
  public router = Router();
  public hrPrepaidCardsController = new HrPrepaidCardsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/download`,this.hrPrepaidCardsController.synchronizeDown);
    this.router.get(`${this.webPath}`,this.hrPrepaidCardsController.getPreloadedCards);
  }
  
}

export default HrPrepaidCardsRoute;
