import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import MeetingsController from "@/controllers/meetings.controller";

class MeetingsRoute implements Routes {
  public path = "/meetings";
  public router = Router();
  public meetingsController = new MeetingsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload`,this.meetingsController.synchronizeUp);
    this.router.get(`${this.path}/download`,this.meetingsController.synchronizeDown);
  }
}

export default MeetingsRoute;
