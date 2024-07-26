import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import TrustGroupGeneratedRfController from "@/controllers/trust_group_generated_rf.controller";

class TrustGroupGeneratedRfRoute implements Routes {
  public path = "/trust-group-generated-rf";
  public router = Router();
  public trustGroupGeneratedRfController =
    new TrustGroupGeneratedRfController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.trustGroupGeneratedRfController.syncUpTrustGroupGeneratedRf
    );
    this.router.get(
      `${this.path}/download`,
      this.trustGroupGeneratedRfController.downloadTrustGroupGeneratedRf
    );
  }
}
export default TrustGroupGeneratedRfRoute;
