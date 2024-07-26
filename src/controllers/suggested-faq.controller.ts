import { NextFunction, Request, Response } from "express";
import { SuggestedFaqDto } from "@dtos/suggested-faq.dto";
import { SuggestedFaq } from "@interfaces/suggested-faq.interface";
import SuggestedFaqService from "@services/suggested-faq.service";

class SuggestedFaqController {
  public suggestedFaqService = new SuggestedFaqService();

  public uploadSuggestedFaqList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const suggestedFaqData: SuggestedFaqDto[] = req.body;

      const updatedData = await this.suggestedFaqService.updateSuggestedFaqList(
        suggestedFaqData
      );

      res
        .status(200)
        .json({ data: updatedData, message: "SuggestedFaq Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadSuggestedFaqList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);

    try {
      const downloadedData =
        await this.suggestedFaqService.downloadSuggestedFaqList(last_sync_time);

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

export default SuggestedFaqController;
