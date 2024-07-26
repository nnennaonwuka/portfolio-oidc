import { NextFunction, Request, Response } from "express";
import { SurveyConfigDto } from "@dtos/survey-config.dto";
import { SurveyConfig } from "@interfaces/survey-config.interface";
import SurveyConfigService from "@services/survey-config.service";

class SurveyConfigController {
  public surveyConfigService = new SurveyConfigService();

  public getSurveyConfig = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllSurveyConfigData: SurveyConfig[] =
        await this.surveyConfigService.findAllSurveyConfigs();

      res
        .status(200)
        .json({ data: findAllSurveyConfigData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getSurveyConfigById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const SurveyConfigId = String(req.params.id);
      const findOneSurveyConfigData: SurveyConfig =
        await this.surveyConfigService.findSurveyConfigById(SurveyConfigId);

      res
        .status(200)
        .json({ data: findOneSurveyConfigData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createSurveyConfig = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const SurveyConfigData: SurveyConfigDto = req.body;
      const createSurveyConfigData: SurveyConfig =
        await this.surveyConfigService.createSurveyConfig(SurveyConfigData);

      res
        .status(201)
        .json({ data: createSurveyConfigData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateSurveyConfig = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const SurveyConfigId = String(req.params.id);
      const SurveyConfigData: SurveyConfigDto = req.body;
      const updateSurveyConfigData: SurveyConfig =
        await this.surveyConfigService.updateSurveyConfig(
          SurveyConfigId,
          SurveyConfigData
        );

      res
        .status(200)
        .json({ data: updateSurveyConfigData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteSurveyConfig = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const SurveyConfigId = String(req.params.id);
      const deleteSurveyConfigData: SurveyConfig =
        await this.surveyConfigService.deleteSurveyConfig(SurveyConfigId);

      res
        .status(200)
        .json({ data: deleteSurveyConfigData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };

  public uploadSurveyConfigList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const surveyConfigData: SurveyConfigDto[] = req.body;

      const updatedData = await this.surveyConfigService.updateSurveyConfigList(
        surveyConfigData
      );

      res
        .status(200)
        .json({ data: updatedData, message: "SurveyConfig Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadSurveyConfigList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);

    try {
      const downloadedData =
        await this.surveyConfigService.downloadSurveyConfigList(last_sync_time);

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

export default SurveyConfigController;
