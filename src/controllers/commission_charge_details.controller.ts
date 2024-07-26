import { HttpException } from "@/exceptions/HttpException";
import { CommissionChargeDetails } from "@/interfaces/commission_charge_details.interface";
import CommissionChargeDetailsService from "@/services/commission_charge_details.service";

import { NextFunction, Request, Response } from "express";

class CommissionChargeDetailsController {
  public CommissionChargeDetailsService = new CommissionChargeDetailsService();

  public syncUpCommissionChargeDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const CommissionChargeDetailsData = req.body;
    try {
      const CommissionChargeDetails =
        await this.CommissionChargeDetailsService.syncUpCommissionChargeDetails(
          CommissionChargeDetailsData
        );

      res.status(201).json({
        data: CommissionChargeDetails,
        message: "Data sync up successful",
      });
    } catch (error) {
      next(error);
    }
  };

  public syncDownCommissionChargeDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.query.last_sync_time)
        throw new HttpException(
          400,
          "Please include appropriate query parameters with last_sync_time"
        );
      const CommissionChargeDetailsData: CommissionChargeDetails[] =
        await this.CommissionChargeDetailsService.syncDownCommissionChargeDetails(
          req.query.last_sync_time as string,
          req.query.entity_id as string
        );
      if (CommissionChargeDetailsData.length === 0) {
        res.status(200).json({ data: [], message: "No downloads were found" });
      } else {
        res.status(200).json({
          data: CommissionChargeDetailsData,
          message: "Data sync down successful",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default CommissionChargeDetailsController;
