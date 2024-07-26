import { NextFunction, Request, Response } from "express";
import { NewMemberDetailsDto } from "@dtos/new-member-details.dto";
import { NewMemberDetails } from "@interfaces/new-member-details.interface";
import NewMemberDetailsService from "@services/new-member-details.service";
import { HttpException } from "@/exceptions/HttpException";
import { isEmpty } from "@utils/util";

class NewMemberDetailsController {
  public newMemberDetailsService = new NewMemberDetailsService();

  public uploadNewMemberDetailsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newMemberDetailsData: NewMemberDetailsDto[] = req.body;

      const updatedData =
        await this.newMemberDetailsService.updateNewMemberDetailsList(
          newMemberDetailsData
        );

      res.status(200).json({
        data: updatedData,
        message: "NewMemberDetails Upload Complete",
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadNewMemberDetailsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);
    const hub_id = String(req.query.hub_id);

    if (isEmpty(last_sync_time) || isEmpty(hub_id)) {
      throw new HttpException(
        400,
        "Please include appropriate request query string with last_sync_time and hub_id"
      );
    }

    try {
      const downloadedData =
        await this.newMemberDetailsService.downloadNewMemberDetailsList(
          last_sync_time,
          hub_id
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

export default NewMemberDetailsController;
