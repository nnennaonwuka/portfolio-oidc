import { Router } from "express";
import MeetingLogController from "@controllers/meeting-log.controller";
import { Routes } from "@interfaces/routes.interface";

class MeetingLogRoute implements Routes {
  public path = "/meeting-log";
  public router = Router();
  public meetingLogController = new MeetingLogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.meetingLogController.uploadMeetingLogList
    );
    this.router.get(
      `${this.path}/download`,
      this.meetingLogController.downloadMeetingLogList
    );
  }
}

export default MeetingLogRoute;
