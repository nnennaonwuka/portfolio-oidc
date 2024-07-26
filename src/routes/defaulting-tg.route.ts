import { Router } from "express";
import DefaultingTgController from "@controllers/defaulting-tg.controller";
import { Routes } from "@interfaces/routes.interface";
import multer from "multer";

const upload = multer({
  dest: "/upload",
});
class DefaultingTgRoute implements Routes {
  public path = "/defaulting-tg";
  public router = Router();
  public DefaultingTgController = new DefaultingTgController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.DefaultingTgController.uploadDefaultingTgList
    );
    this.router.post(
      `${this.path}/portfolio-management/upload`,
      this.DefaultingTgController.uploadPortfolioManagement
    );
    // this.router.post(
    //   `${this.path}/csv-upload`,
    //   upload.single("file"),
    //   this.DefaultingTgController.bulkUploadDefaultingTgList
    // );
    this.router.get(
      `${this.path}/download`,
      this.DefaultingTgController.downloadDefaultingTgList
    );
    this.router.get(
      `${this.path}/downloadTgList`,
      this.DefaultingTgController.downloadTgList
    );
    this.router.get(
      `${this.path}`,
      this.DefaultingTgController.getDefaultingTg
    );
  }
}

export default DefaultingTgRoute;
