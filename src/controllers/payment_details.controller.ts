import { HttpException } from "@/exceptions/HttpException";
import { PaymentDetails } from "@/interfaces/payment_details.interface";
import PaymentDetailsService from "@/services/payment_details.service";

import { NextFunction, Request, Response } from "express";

class PaymentDetailsController {
  public paymentDetailsService = new PaymentDetailsService();

  public syncUpPaymentDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const paymentDetailsData = req.body;
    try {
      const paymentDetails =
        await this.paymentDetailsService.syncUpPaymentDetails(
          paymentDetailsData
        );

      res
        .status(201)
        .json({ data: paymentDetails, message: "Data sync up successful" });
    } catch (error) {
      next(error);
    }
  };

  public syncDownPaymentDetails = async (
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
      const PaymentDetailsData: PaymentDetails[] =
        await this.paymentDetailsService.syncDownPaymentDetails(
          req.query.last_sync_time as string,
          req.query.entity_id as string
        );
      if (PaymentDetailsData.length === 0) {
        res.status(200).json({ data: [], message: "No downloads were found" });
      } else {
        res.status(200).json({
          data: PaymentDetailsData,
          message: "Data sync down successful",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default PaymentDetailsController;
