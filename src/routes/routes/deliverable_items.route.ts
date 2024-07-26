import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import DeliverableItemsController from "@controllers/deliverable_items.controller";

class DeliverableItemsRoute implements Routes {
  public path = "/deliverable_items";
  public router = Router();
  public DeliverableItemsController = new DeliverableItemsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.DeliverableItemsController.synchronizeUp
    );
    this.router.get(
      `${this.path}/download`,
      this.DeliverableItemsController.synchronizeDown
    );
  }
}

export default DeliverableItemsRoute;
