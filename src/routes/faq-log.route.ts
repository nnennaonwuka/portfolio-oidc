import { Router } from "express";
import FaqLogController from "@controllers/faq-log.controller";
import { Routes } from "@interfaces/routes.interface";

class FaqLogRoute implements Routes {
  public path = "/faq-log";
  public router = Router();
  public faqLogController = new FaqLogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.faqLogController.uploadFaqLogList
    );
    this.router.get(
      `${this.path}/download`,
      this.faqLogController.downloadFaqLogList
    );
  }
}

export default FaqLogRoute;
