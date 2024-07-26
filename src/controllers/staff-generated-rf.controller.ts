import { NextFunction, Request, Response } from "express";
import { StaffGeneratedRfDto } from "@dtos/staff-generated-rf.dto";
import StaffGeneratedRfService from "@services/staff-generated-rf.service";

class StaffGeneratedRfController {
  public staffGeneratedRfService = new StaffGeneratedRfService();

  public uploadStaffGeneratedRfList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const staffGeneratedRfData: StaffGeneratedRfDto[] = req.body;

      const updatedData =
        await this.staffGeneratedRfService.updateStaffGeneratedRfList(
          staffGeneratedRfData
        );

      res.status(200).json({
        data: updatedData,
        message: "StaffGeneratedRf Upload Complete",
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadStaffGeneratedRfList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const downloadedData =
        await this.staffGeneratedRfService.downloadStaffGeneratedRfList(
          req.query.last_sync_time as string,
          req.query.staff_id as string,
          req.query.hub_id as string
        );

      if (downloadedData.length === 0) {
        res.status(200).json({ data: [], message: "No data was found" });
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

export default StaffGeneratedRfController;
