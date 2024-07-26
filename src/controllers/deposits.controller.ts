import { NextFunction, Request, Response } from "express";
import { DepositsDto } from "@/dtos/deposits.dto";
import DepositsService from "@/services/deposits.service";
import { HttpException } from "@/exceptions/HttpException";
import { removeSyncFlag } from "@/utils/util";

class DepositsController {
  public DepositsService = new DepositsService();

  public getDepositss = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllDepositsData: DepositsDto[] =
        await this.DepositsService.findAllDeposits();

      res.status(200).json({ data: findAllDepositsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public uploadDepositsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const new_rew_body = removeSyncFlag(req.body);
      const DepositsData: DepositsDto[] = new_rew_body;

      const updatedData = await this.DepositsService.updateDepositsList(
        DepositsData
      );

      res.status(200).json({
        data: updatedData,
        message: "Deposits Data Upload Complete",
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadDepositsList = async (
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
      const downloadedData = await this.DepositsService.downloadDepositsList(
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

export default DepositsController;
