import { NextFunction, Request, Response } from "express";
import { ReferenceDepositsDto } from "@dtos/reference-deposits.dto";
import ReferenceDepositsService from "@/services/reference-deposits.service";
import { HttpException } from "@/exceptions/HttpException";

class ReferenceDepositsController {
  public ReferenceDepositsService = new ReferenceDepositsService();

  public getReferenceDepositss = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllReferenceDepositsData: ReferenceDepositsDto[] =
        await this.ReferenceDepositsService.findAllReferenceDeposits();

      res
        .status(200)
        .json({ data: findAllReferenceDepositsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  // public uploadReferenceDepositsList = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   try {
  //     const ReferenceDepositsData: ReferenceDepositsDto[] = req.body;

  //     const updatedData = await this.ReferenceDepositsService.updateReferenceDepositsList(
  //       ReferenceDepositsData
  //     );

  //     res.status(200).json({
  //       data: updatedData,
  //       message: "ReferenceDeposits Data Upload Complete",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public downloadReferenceDepositsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);

    try {
      if (!req.query.last_sync_time)
        throw new HttpException(
          400,
          "Please include appropriate query parameters with last_sync_time"
        );
      const downloadedData =
        await this.ReferenceDepositsService.downloadReferenceDepositsList(
          req.query.last_sync_time as string,
          req.query.entity_id as string
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

export default ReferenceDepositsController;
