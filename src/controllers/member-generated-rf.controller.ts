import { NextFunction, Request, Response } from "express";
import { MemberGeneratedRfDto } from "@dtos/member-generated-rf.dto";
import MemberGeneratedRfService from "@services/member-generated-rf.service";
import { isEmpty } from "@utils/util";

class MemberGeneratedRfController {
  public memberGeneratedRfService = new MemberGeneratedRfService();

  public uploadMemberGeneratedRfList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const memberGeneratedRfData: MemberGeneratedRfDto[] = req.body;

      const updatedData =
        await this.memberGeneratedRfService.updateMemberGeneratedRfList(
          memberGeneratedRfData
        );

      res.status(200).json({
        data: updatedData,
        message: "MemberGeneratedRf Upload Complete",
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadMemberGeneratedRfList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // Now downloads by hub
    if (isEmpty(req.query.last_sync_time) || isEmpty(req.query.staff_id)) {
      res.status(400).json({
        message:
          "Please include appropriate query parameters with valid last_sync_time and staff_id",
      });
    }

    try {
      const downloadedData =
        await this.memberGeneratedRfService.downloadMemberGeneratedRfList(
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

  public downloadMemberGeneratedRfPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);
    const staff_id = String(req.query.staff_id);

    try {
      const downloadedData =
        await this.memberGeneratedRfService.downloadMemberGeneratedRfPayment(
          last_sync_time,
          staff_id
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

  public downloadMemberGeneratedRfListByHub = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);
    const hub_id = String(req.query.hub_id);

    try {
      const downloadedData =
        await this.memberGeneratedRfService.downloadMemberGeneratedRfListByHub(
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

  public updateMemberGeneratedRfFromFarming = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const updatedData =
        await this.memberGeneratedRfService.updateMemberGeneratedRfFromFarming(
          req.body
        );

      res.status(200).json({
        data: updatedData,
        message: " Update Completed",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default MemberGeneratedRfController;
