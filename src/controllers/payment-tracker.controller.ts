import { NextFunction, Request, Response } from "express";
import { PaymentTrackerDto } from "@dtos/payment-tracker.dto";
import { HttpException } from "@/exceptions/HttpException";

import { PaymentTracker } from "@interfaces/payment-tracker.interface";
import PaymentTrackerService from "@services/payment-tracker.service";

class PaymentTrackerController {
  public PaymentTrackerService = new PaymentTrackerService();

  public getPaymentTracker = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllPaymentTrackerData: PaymentTracker[] =
        await this.PaymentTrackerService.findAllPaymentTracker();

      res
        .status(200)
        .json({ data: findAllPaymentTrackerData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public uploadPaymentTrackerList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const PaymentTrackerData: PaymentTrackerDto[] = req.body;

      const updatedData =
        await this.PaymentTrackerService.updatePaymentTrackerList(
          PaymentTrackerData
        );

      res
        .status(200)
        .json({ data: updatedData, message: "PaymentTracker Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadPaymentTrackerList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);
    const staff_id = String(req.query.staff_id);

    try {
      if (!req.query.last_sync_time || !req.query.staff_id)
        throw new HttpException(
          400,
          "Please include appropriate query paramaters with last_sync_time and staff_id"
        );
      const downloadedData =
        await this.PaymentTrackerService.downloadPaymentTrackerList(
          req.query.last_sync_time as string,
          req.query.staff_id as string,
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

export default PaymentTrackerController;
