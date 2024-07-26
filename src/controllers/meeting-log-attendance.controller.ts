import { NextFunction, Request, Response } from "express";
import { MeetingLogAttendanceDto } from "@dtos/meeting-log-attendance.dto";
import MeetingLogAttendanceService from "@services/meeting-log-attendance.service";
import { HttpException } from "@/exceptions/HttpException";

class MeetingLogAttendanceController {
  public meetingLogAttendanceService = new MeetingLogAttendanceService();

  public uploadMeetingLogAttendanceList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const meetingLogAttendanceData: MeetingLogAttendanceDto[] = req.body;

      const updatedData =
        await this.meetingLogAttendanceService.updateMeetingLogAttendanceList(
          meetingLogAttendanceData
        );

      res.status(200).json({
        data: updatedData,
        message: "MeetingLogAttendance Upload Complete",
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadMeetingLogAttendanceList = async (
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
        await this.meetingLogAttendanceService.downloadMeetingLogAttendanceList(
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

export default MeetingLogAttendanceController;
