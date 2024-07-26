import { NextFunction, Request, Response } from "express";
import { MeetingLogDto } from "@dtos/meeting-log.dto";
import MeetingLogService from "@services/meeting-log.service";
import { HttpException } from "@/exceptions/HttpException";

class MeetingLogController {
  public meetingLogService = new MeetingLogService();

  public uploadMeetingLogList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const meetingLogData: MeetingLogDto[] = req.body;

      const updatedData = await this.meetingLogService.updateMeetingLogList(
        meetingLogData
      );

      res
        .status(200)
        .json({ data: updatedData, message: "MeetingLog Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadMeetingLogList = async (
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
        await this.meetingLogService.downloadMeetingLogList(
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

export default MeetingLogController;
