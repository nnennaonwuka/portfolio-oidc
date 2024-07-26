import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import OperatorPerformanceController from '../controllers/operator_performance.controller';

class OperatorPerformanceRoute implements Routes {
  public path = "/operator-performance";
  public router = Router();
  public operatorPerformanceController = new OperatorPerformanceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload`,this.operatorPerformanceController.synchronizeUp);
    this.router.get(`${this.path}/download`,this.operatorPerformanceController.synchronizeDown);
  }
}

export default OperatorPerformanceRoute;
