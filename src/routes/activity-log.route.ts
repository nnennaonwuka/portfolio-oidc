import { Router } from "express";
import ActivityLogController from "@controllers/activity-log.controller";
import { Routes } from "@interfaces/routes.interface";

class ActivityLogRoute implements Routes {
  public path = "/activity-log";
  public router = Router();
  public activityLogController = new ActivityLogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.activityLogController.uploadActivityLogList
    );
    this.router.get(
      `${this.path}/download`,
      this.activityLogController.downloadActivityLogList
    );
  }
}

export default ActivityLogRoute;
