import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import MeetingRoomsController from "@/controllers/meeting_rooms.controller";

class MeetingRoomsRoute implements Routes {
  public path = "/meeting-rooms";
  public router = Router();
  public meetingRoomsController = new MeetingRoomsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload`,this.meetingRoomsController.synchronizeUp);
    this.router.get(`${this.path}/download`,this.meetingRoomsController.synchronizeDown);
  }
}

export default MeetingRoomsRoute;
