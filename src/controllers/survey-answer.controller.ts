import { NextFunction, Request, Response } from "express";
import { SurveyAnswerDto } from "@dtos/survey-answer.dto";
import ServiceLogService from "@services/survey-answer.service";
import { HttpException } from "@/exceptions/HttpException";

class SurveyAnswerController {
  public surveyAnswerService = new ServiceLogService();

  public uploadSurveyAnswerList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const surveyAnswerData: SurveyAnswerDto[] = req.body;

      const updatedData = await this.surveyAnswerService.updateSurveyAnswerList(
        surveyAnswerData
      );

      res
        .status(200)
        .json({ data: updatedData, message: "SurveyAnswer Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadSurveyAnswerList = async (
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
        await this.surveyAnswerService.downloadSurveyAnswerList(
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

export default SurveyAnswerController;
