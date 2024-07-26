import { NextFunction, Request, Response } from "express";
import { SurveyQuestionDto } from "@dtos/survey-question.dto";
import { SurveyQuestion } from "@interfaces/survey-question.interface";
import SurveyQuestionService from "@services/survey-question.service";

class SurveyQuestionController {
  public surveyQuestionService = new SurveyQuestionService();

  public getSurveyQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllSurveyQuestionData: SurveyQuestion[] =
        await this.surveyQuestionService.findAllSurveyQuestion();

      res
        .status(200)
        .json({ data: findAllSurveyQuestionData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getSurveyQuestionById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const surveyQuestionId = String(req.params.id);
      const findOneSurveyQuestionData: SurveyQuestion =
        await this.surveyQuestionService.findSurveyQuestionById(
          surveyQuestionId
        );

      res
        .status(200)
        .json({ data: findOneSurveyQuestionData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createSurveyQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const surveyQuestionData: SurveyQuestionDto = req.body;
      const createSurveyQuestionData: SurveyQuestion =
        await this.surveyQuestionService.createSurveyQuestion(
          surveyQuestionData
        );

      res
        .status(201)
        .json({ data: createSurveyQuestionData, message: "created" });
    } catch (error) {
      next(error);
    }
  };
  public updateSurveyQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const surveyQuestionId = String(req.params.id);
      const surveyQuestionData: SurveyQuestionDto = req.body;
      const updateSurveyQuestionData: SurveyQuestion =
        await this.surveyQuestionService.updateSurveyQuestion(
          surveyQuestionId,
          surveyQuestionData
        );

      res
        .status(200)
        .json({ data: updateSurveyQuestionData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteSurveyQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const surveyQuestionId = String(req.params.id);
      const deleteSurveyQuestionData: SurveyQuestion =
        await this.surveyQuestionService.deleteSurveyQuestion(surveyQuestionId);

      res
        .status(200)
        .json({ data: deleteSurveyQuestionData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };

  public uploadSurveyQuestionList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const surveyQuestionData: SurveyQuestionDto[] = req.body;

      const updatedData =
        await this.surveyQuestionService.updateSurveyQuestionList(
          surveyQuestionData
        );

      res
        .status(200)
        .json({ data: updatedData, message: "SurveyQuestion Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadSurveyQuestionList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);

    try {
      const downloadedData =
        await this.surveyQuestionService.downloadSurveyQuestionList(
          last_sync_time
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

export default SurveyQuestionController;
