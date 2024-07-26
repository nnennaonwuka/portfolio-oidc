import { NextFunction, Request, Response } from "express";
import { MeetingConfigDto } from "@dtos/meeting-config.dto";
import { MeetingConfig } from "@interfaces/meeting-config.interface";
import MeetingConfigService from "@services/meeting-config.service";

class MeetingConfigController {
  public meetingConfigService = new MeetingConfigService();

  public uploadMeetingConfigList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const meetingConfigData: MeetingConfigDto[] = req.body;

      const updatedData =
        await this.meetingConfigService.updateMeetingConfigList(
          meetingConfigData
        );

      res
        .status(200)
        .json({ data: updatedData, message: "MeetingConfig Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadMeetingConfigList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);

    try {
      const downloadedData =
        await this.meetingConfigService.downloadMeetingConfigList(
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

export default MeetingConfigController;
