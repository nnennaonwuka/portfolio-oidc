import { Router } from "express";
import FaqConfigController from "@controllers/faq-config.controller";
import { FaqConfigDto } from "@dtos/faq-config.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class FaqConfigRoute implements Routes {
  public path = "/faq-config";
  public router = Router();
  public faqConfigController = new FaqConfigController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.faqConfigController.uploadFaqConfigList
    );
    this.router.get(
      `${this.path}/download`,
      this.faqConfigController.downloadFaqConfigList
    );
    this.router.get(`${this.path}`, this.faqConfigController.getFaqConfig);
    this.router.get(
      `${this.path}/:id(\\d+)`,
      this.faqConfigController.getFaqConfigById
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(FaqConfigDto, "body"),
      this.faqConfigController.createFaqConfig
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(FaqConfigDto, "body", true),
      this.faqConfigController.updateFaqConfig
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      this.faqConfigController.deleteFaqConfig
    );
  }
}

export default FaqConfigRoute;
