import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import MeetingAtendeesController from "@/controllers/meeting_attendees.controller";

class MeetingAttendeesRoute implements Routes {
  public path = "/meeting-attendees";
  public router = Router();
  public meetingAttendeesController = new MeetingAtendeesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload`,this.meetingAttendeesController.synchronizeUp);
    this.router.get(`${this.path}/download`,this.meetingAttendeesController.synchronizeDown);
  }
}

export default MeetingAttendeesRoute;
