import { NextFunction, Request, Response } from "express";
import { SurveyLogDto } from "@dtos/survey-log.dto";
import SurveyLogService from "@services/survey-log.service";
import { HttpException } from "@/exceptions/HttpException";

class SurveyLogController {
  public surveyLogService = new SurveyLogService();

  public uploadSurveyLogList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const surveyLogData: SurveyLogDto[] = req.body;

      const updatedData = await this.surveyLogService.updateSurveyLogList(
        surveyLogData
      );

      res
        .status(200)
        .json({ data: updatedData, message: "SurveyLog Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadSurveyLogList = async (
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
      const downloadedData = await this.surveyLogService.downloadSurveyLogList(
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

export default SurveyLogController;
