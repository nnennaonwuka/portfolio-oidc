import { Router } from "express";
import PortfolioMediaController from "@controllers/portfolio-media.controller";
import { Routes } from "@interfaces/routes.interface";

class PortfolioMediaRoute implements Routes {
  public path = "/portfolio-media";
  public router = Router();
  public portfolioMediaController = new PortfolioMediaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.portfolioMediaController.uploadPortfolioMediaList
    );
    this.router.get(
      `${this.path}/download`,
      this.portfolioMediaController.downloadPortfolioMediaList
    );
  }
}

export default PortfolioMediaRoute;
