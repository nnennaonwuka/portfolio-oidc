import { NextFunction, Request, Response } from "express";
import { FaqConfigDto } from "@dtos/faq-config.dto";
import { FaqConfig } from "@interfaces/faq-config.interface";
import FaqConfigService from "@services/faq-config.service";

class FaqConfigController {
  public faqConfigService = new FaqConfigService();

  public getFaqConfig = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllFaqConfigData: FaqConfig[] =
        await this.faqConfigService.findAllFaqConfig();

      res.status(200).json({ data: findAllFaqConfigData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getFaqConfigById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const faqConfigId = String(req.params.id);
      const findOneMeetingConfigData: FaqConfig =
        await this.faqConfigService.findFaqConfigById(faqConfigId);

      res
        .status(200)
        .json({ data: findOneMeetingConfigData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createFaqConfig = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const faqConfigData: FaqConfigDto = req.body;
      const createFaqConfigData: FaqConfig =
        await this.faqConfigService.createFaqConfig(faqConfigData);

      res.status(201).json({ data: createFaqConfigData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateFaqConfig = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const faqConfigId = String(req.params.id);
      const faqConfigData: FaqConfigDto = req.body;
      const updateFaqConfigData: FaqConfig =
        await this.faqConfigService.updateFaqConfig(faqConfigId, faqConfigData);

      res.status(200).json({ data: updateFaqConfigData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteFaqConfig = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const meetingConfigId = String(req.params.id);
      const deleteFaqConfigData: FaqConfig =
        await this.faqConfigService.deleteFaqConfig(meetingConfigId);

      res.status(200).json({ data: deleteFaqConfigData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };

  public uploadFaqConfigList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const faqConfigData: FaqConfigDto[] = req.body;

      const updatedData = await this.faqConfigService.updateFaqConfigList(
        faqConfigData
      );

      res
        .status(200)
        .json({ data: updatedData, message: "MeetingConfig Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadFaqConfigList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);

    try {
      const downloadedData = await this.faqConfigService.downloadFaqConfigList(
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

export default FaqConfigController;
