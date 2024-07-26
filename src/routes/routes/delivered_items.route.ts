import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import DeliveredItemsController from "@/controllers/delivered_items.controller";

class DeliveredItemsRoute implements Routes {
  public path = "/delivered_items";
  public router = Router();
  public DeliveredItemsController = new DeliveredItemsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.DeliveredItemsController.synchronizeUp
    );
    this.router.get(
      `${this.path}/download`,
      this.DeliveredItemsController.synchronizeDown
    );
  }
}

export default DeliveredItemsRoute;
