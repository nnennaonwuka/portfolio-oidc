import { NextFunction, Request, Response } from "express";
import WalletDetailsService from "@/services/wallet_details.service";

import { HttpException } from "@/exceptions/HttpException";
import { WalletDetailsDto } from "@/dtos/wallet-details.dto";

class WalletDetailsController {
  public WalletDetailsService = new WalletDetailsService();

  public getWalletDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllWalletDetailsData: WalletDetailsDto[] =
        await this.WalletDetailsService.findAllWalletDetails();

      res
        .status(200)
        .json({ data: findAllWalletDetailsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  // public uploadOperatorWalletDetailsList = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   try {
  //     const OperatorWalletDetailsData: OperatorWalletDetailsDto[] = req.body;

  //     const updatedData =
  //       await this.OperatorWalletDetailsService.updateOperatorWalletDetailsList(
  //         OperatorWalletDetailsData
  //       );

  //     res.status(200).json({
  //       data: updatedData,
  //       message: "operator wallet details Upload Complete",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public downloadStaffWalletDetailsList = async (
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
        await this.WalletDetailsService.downloadStaffWalletDetailsList(
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

  public downloadTgWalletDetailsList = async (
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
        await this.WalletDetailsService.downloadTgWalletDetailsList(
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

export default WalletDetailsController;
