import { Router } from "express";
import KnowledgeLogController from "@controllers/knowledge-log.controller";
import { Routes } from "@interfaces/routes.interface";

class KnowledgeLogRoute implements Routes {
  public path = "/knowledge-log";
  public router = Router();
  public knowledgeLogController = new KnowledgeLogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.knowledgeLogController.uploadKnowledgeLogList
    );
    this.router.get(
      `${this.path}/download`,
      this.knowledgeLogController.downloadKnowledgeLogList
    );
  }
}

export default KnowledgeLogRoute;
