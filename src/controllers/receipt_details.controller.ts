import { NextFunction, Request, Response } from "express";
import { ReceiptDetailsDto } from "@/dtos/receipt_details.dto";
import ReceiptDetailsService from "@/services/receipt_details.service";
import { HttpException } from "@/exceptions/HttpException";
import { removeSyncFlag } from "@/utils/util";

class ReceiptDetailsController {
  public ReceiptDetailsService = new ReceiptDetailsService();

  public getReceiptDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllReceiptDetailsData: ReceiptDetailsDto[] =
        await this.ReceiptDetailsService.findAllReceiptDetailss();

      res
        .status(200)
        .json({ data: findAllReceiptDetailsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public uploadReceiptDetailsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const new_req_body = removeSyncFlag(req.body);
      const ReceiptDetailsData: ReceiptDetailsDto[] = new_req_body;

      const updatedData =
        await this.ReceiptDetailsService.updateReceiptDetailsList(
          ReceiptDetailsData
        );

      res.status(200).json({
        data: updatedData,
        message: "Payment claims Upload Complete",
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadReceiptDetailsList = async (
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
        await this.ReceiptDetailsService.downloadReceiptDetailsList(
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

export default ReceiptDetailsController;
