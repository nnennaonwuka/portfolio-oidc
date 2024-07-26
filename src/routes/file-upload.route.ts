import { Router } from "express";
import FileUploadController from "@controllers/file-upload.controller";
import { Routes } from "@interfaces/routes.interface";
import multer from "multer";

//temporally saves file to be uploaded to uploads folder
const upload = multer({
  dest: "uploads/",
});

class FileUploadRoute implements Routes {
  public path = "/file-upload";
  public router = Router();
  public fileUploadController = new FileUploadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      upload.single("file"),
      this.fileUploadController.uploadFile
    );
    this.router.post(
      `${this.path}/bulk`,
      upload.array("files"),
      this.fileUploadController.bulkUploadFiles
    );
    this.router.post(
      `${this.path}/pc`,
      upload.single("file"),
      this.fileUploadController.uploadPaymentColectionFile
    );
  }
}

export default FileUploadRoute;
