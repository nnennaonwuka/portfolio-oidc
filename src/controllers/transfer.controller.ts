import { NextFunction, Request, Response } from "express";
import { TransferDto } from "@dtos/transfer.dto";
import TransferService from "@services/transfer.service";
import { HttpException } from "@/exceptions/HttpException";
import { isEmpty } from "@utils/util";

class TransferController {
  public TransferService = new TransferService();

  public uploadTransferList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const transferData = req.body;

      const updatedData = await this.TransferService.updateTransferList(
        transferData
      );

      res.status(200).json({
        data: updatedData,
        message: "Transfer Upload Complete",
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadTransferList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);
    const staff_id = String(req.query.staff_id);
    const hub_id = String(req.query.hub_id);

    if (isEmpty(last_sync_time) || isEmpty(hub_id)) {
      throw new HttpException(
        400,
        "Please include appropriate request query string with last_sync_time and hub_id"
      );
    }

    try {
      const downloadedData = await this.TransferService.downloadTransferList(
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

export default TransferController;
