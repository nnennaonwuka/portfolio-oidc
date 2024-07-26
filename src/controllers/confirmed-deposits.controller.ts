import { NextFunction, Request, Response } from "express";
import ConfirmedDepositsService from "@/services/confirmed-deposits.service";
import { ConfirmedDepositsDto } from "@/dtos/confirmed-deposits.dto";
import { HttpException } from "@/exceptions/HttpException";
import { removeSyncFlag } from "@/utils/util";

class ConfirmedDepositsController {
  public ConfirmedDepositsService = new ConfirmedDepositsService();

  public getConfirmedDepositss = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllConfirmedDepositsData: ConfirmedDepositsDto[] =
        await this.ConfirmedDepositsService.findAllConfirmedDepositss();

      res
        .status(200)
        .json({ data: findAllConfirmedDepositsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public uploadConfirmedDepositsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const new_req_body = removeSyncFlag(req.body);
    try {
      const ConfirmedDepositsData: ConfirmedDepositsDto[] = new_req_body;

      const updatedData =
        await this.ConfirmedDepositsService.updateConfirmedDepositsList(
          ConfirmedDepositsData
        );

      res.status(200).json({
        data: updatedData,
        message: "Confirmed deposits Upload Complete",
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadConfirmedDepositsList = async (
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
        await this.ConfirmedDepositsService.downloadConfirmedDepositsList(
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

export default ConfirmedDepositsController;
