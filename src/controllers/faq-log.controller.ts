import { NextFunction, Request, Response } from "express";
import { FaqLogDto } from "@dtos/faq-log.dto";
import FaqLogService from "@services/faq-log.service";
import { HttpException } from "@/exceptions/HttpException";

class FaqLogController {
  public FaqLogService = new FaqLogService();

  public uploadFaqLogList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const faqLogData: FaqLogDto[] = req.body;

      const updatedData = await this.FaqLogService.updateFaqLogList(faqLogData);

      res
        .status(200)
        .json({ data: updatedData, message: "FaqLog Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadFaqLogList = async (
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
      const downloadedData = await this.FaqLogService.downloadFaqLogList(
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

export default FaqLogController;
