import { Router } from "express";
import FaqController from "@controllers/faq.controller";
import { FaqDto } from "@dtos/faq.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class FaqRoute implements Routes {
  public path = "/faq";
  public router = Router();
  public faqController = new FaqController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload`, this.faqController.uploadFaqList);
    this.router.get(
      `${this.path}/download`,
      this.faqController.downloadFaqList
    );
    this.router.get(`${this.path}`, this.faqController.getFaq);
    this.router.get(`${this.path}/:id(\\d+)`, this.faqController.getFaqById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(FaqDto, "body"),
      this.faqController.createFaq
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(FaqDto, "body", true),
      this.faqController.updateFaq
    );
    this.router.delete(`${this.path}/:id(\\d+)`, this.faqController.deleteFaq);
  }
}

export default FaqRoute;
