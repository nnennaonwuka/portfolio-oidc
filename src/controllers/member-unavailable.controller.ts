import { NextFunction, Request, Response } from "express";
import { MemberUnavailableDto } from "@dtos/member-unavailable.dto";
import { MemberUnavailable } from "@interfaces/member-unavailable.interface";
import MemberUnavailableService from "@services/member-unavailable.service";

class MemberUnavailableController {
  public memberUnavailableService = new MemberUnavailableService();

  public uploadMemberUnavailableList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const memberUnavailableData: MemberUnavailableDto[] = req.body;

      const updatedData =
        await this.memberUnavailableService.updateMemberUnavailableList(
          memberUnavailableData
        );

      res.status(200).json({
        data: updatedData,
        message: "MemberUnavailable Upload Complete",
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadMemberUnavailableList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);
    const staff_id = String(req.query.staff_id);

    try {
      const downloadedData =
        await this.memberUnavailableService.downloadMemberUnavailableList(
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

export default MemberUnavailableController;
