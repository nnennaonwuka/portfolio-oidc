import { NextFunction, Request, Response } from "express";
import { ActivityLogDto } from "@dtos/activity-log.dto";
import ActivityLogService from "@services/activity-log.service";
import { HttpException } from "@/exceptions/HttpException";

class ActivityLogController {
  public activityLogService = new ActivityLogService();

  public uploadActivityLogList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const activityLogData: ActivityLogDto[] = req.body;

      const updatedData = await this.activityLogService.updateActivityLogList(
        activityLogData
      );

      res
        .status(200)
        .json({ data: updatedData, message: "ActivityLog Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadActivityLogList = async (
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
        await this.activityLogService.downloadActivityLogList(
          req.query.last_sync_time as string,
          req.query.staff_id as string,
          req.query.operator_id as string
        );

      if (downloadedData.length === 0) {
        res.status(200).json({ data: [], message: "No data was found" });
      } else {
        res.status(200).json({
          data: downloadedData,
          message: "ActivityLog Download Complete",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default ActivityLogController;
