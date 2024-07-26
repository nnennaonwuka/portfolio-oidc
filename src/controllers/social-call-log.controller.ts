import { NextFunction, Request, Response } from "express";
import { SocialCallLogDto } from "@dtos/social-call-log.dto";
import SocialCallLogService from "@services/social-call-log.service";

class SocialCallLogController {
  public socialCallLogService = new SocialCallLogService();

  public uploadSocialCallList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const socialCallLogData: SocialCallLogDto[] = req.body;

      const updatedData =
        await this.socialCallLogService.updateSocialCallLogList(
          socialCallLogData
        );

      res
        .status(200)
        .json({ data: updatedData, message: "socialCall Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadSocialCallList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);
    const staff_id = String(req.query.staff_id);

    try {
      const downloadedData =
        await this.socialCallLogService.downloadSocialCallLogList(
          last_sync_time,
          staff_id
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

export default SocialCallLogController;
