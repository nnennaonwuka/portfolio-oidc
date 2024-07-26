import { Router } from "express";
import RankController from "@/controllers/rank.controller";
import { Routes } from "@interfaces/routes.interface";

class RankRoute implements Routes {
  public path = "/rank";
  public router = Router();
  public RankController = new RankController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/download`, this.RankController.syncDown);
  }
}

export default RankRoute;
