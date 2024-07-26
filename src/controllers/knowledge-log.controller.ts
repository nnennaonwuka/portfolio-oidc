import { NextFunction, Request, Response } from "express";
import { KnowledgeLogDto } from "@dtos/knowledge-log.dto";
import KnowledgeLogService from "@services/knowledge-log.service";
import { HttpException } from "@/exceptions/HttpException";

class KnowledgeLogController {
  public knowledgeLogService = new KnowledgeLogService();

  public uploadKnowledgeLogList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const knowledgeLogData: KnowledgeLogDto[] = req.body;

      const updatedData = await this.knowledgeLogService.updateKnowledgeLogList(
        knowledgeLogData
      );

      res
        .status(200)
        .json({ data: updatedData, message: "KnowledgeLog Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadKnowledgeLogList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.query.last_sync_time || !req.query.staff_id)
        throw new HttpException(
          400,
          "Please include appropriate request query string with last_sync_time and staff_id"
        );
      const downloadedData =
        await this.knowledgeLogService.downloadKnowledgeLogList(
          req.query.last_sync_time as string,
          req.query.staff_id as string,
          req.query.operator_id as string
        );

      if (downloadedData.length === 0) {
        res.status(200).json({ data: [], message: "No data were found" });
      } else {
        res
          .status(200)
          .json({ data: downloadedData, message: "Download Complete" });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default KnowledgeLogController;
