import { Router } from "express";
import MeetingConfigController from "@controllers/meeting-config.controller";
import { MeetingConfigDto } from "@dtos/meeting-config.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class MeetingConfigRoute implements Routes {
  public path = "/meeting-config";
  public router = Router();
  public meetingConfigController = new MeetingConfigController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.meetingConfigController.uploadMeetingConfigList
    );
    this.router.get(
      `${this.path}/download`,
      this.meetingConfigController.downloadMeetingConfigList
    );
  }
}

export default MeetingConfigRoute;
