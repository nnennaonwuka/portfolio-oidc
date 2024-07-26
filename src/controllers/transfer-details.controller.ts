import { HttpException } from "@/exceptions/HttpException";
import { TransferDetails } from "@/interfaces/transfer-details.interface";
import TransferDetailsService from "@/services/transfer-details.service";

import { NextFunction, Request, Response } from "express";

class TransferDetailsController {
  public transferDetailsService = new TransferDetailsService();

  public syncUpTransferDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const transferDetailsData = req.body;
    try {
      const transferDetails =
        await this.transferDetailsService.syncUpTransferDetails(
          transferDetailsData
        );

      res
        .status(201)
        .json({ data: transferDetails, message: "Data sync up successful" });
    } catch (error) {
      next(error);
    }
  };

  public syncDownTransferDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.query.last_sync_time || !req.query.staff_id)
        throw new HttpException(
          400,
          "Please include appropriate query parameters with last_sync_time and staff_id"
        );
      const transferDetails: TransferDetails[] =
        await this.transferDetailsService.syncDownTransferDetails(
          req.query.last_sync_time as string,
          req.query.staff_id as string
        );
      if (transferDetails.length === 0) {
        res.status(200).json({ data: [], message: "No downloads were found" });
      } else {
        res.status(200).json({
          data: transferDetails,
          message: "Data sync down successful",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default TransferDetailsController;
