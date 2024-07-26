import { Router } from "express";
import MeetingLogAttendanceController from "@controllers/meeting-log-attendance.controller";
import { Routes } from "@interfaces/routes.interface";

class MeetingLogAttendanceRoute implements Routes {
  public path = "/meeting-log-attendance";
  public router = Router();
  public meetingLogAttendanceController = new MeetingLogAttendanceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.meetingLogAttendanceController.uploadMeetingLogAttendanceList
    );
    this.router.get(
      `${this.path}/download`,
      this.meetingLogAttendanceController.downloadMeetingLogAttendanceList
    );
  }
}

export default MeetingLogAttendanceRoute;
