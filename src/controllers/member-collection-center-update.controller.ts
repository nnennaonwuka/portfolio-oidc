import { NextFunction, Request, Response } from "express";
import { MemberCollectionCenterUpdateDto } from "@dtos/member-collection-center-update.dto";
import { MemberCollectionCenterUpdate } from "@interfaces/member-collection-center-update.interface";
import MemberCollectionCenterUpdateService from "@services/member-collection-center-update.service";

class MemberCollectionCenterUpdateController {
  public memberCollectionCenterUpdateService =
    new MemberCollectionCenterUpdateService();

  public uploadMemberCollectionCenterUpdateList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const memberCollectionCenterUpdateData: MemberCollectionCenterUpdateDto[] =
        req.body;

      const updatedData =
        await this.memberCollectionCenterUpdateService.updateMemberCollectionCenterUpdateList(
          memberCollectionCenterUpdateData
        );

      res.status(200).json({
        data: updatedData,
        message: "MemberCollectionCenterUpdate Upload Complete",
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadMemberCollectionCenterUpdateList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);
    const staff_id = String(req.query.staff_id);

    try {
      const downloadedData =
        await this.memberCollectionCenterUpdateService.downloadMemberCollectionCenterUpdateList(
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

export default MemberCollectionCenterUpdateController;
