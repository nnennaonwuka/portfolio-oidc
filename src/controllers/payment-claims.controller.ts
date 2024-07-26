import { NextFunction, Request, Response } from "express";
import { PaymentClaimsDto } from "@/dtos/payment_claims.dto";
import PaymentClaimsService from "@/services/payment-claims.service";
import { HttpException } from "@/exceptions/HttpException";
import { removeSyncFlag } from "@/utils/util";

class PaymentClaimsController {
  public PaymentClaimsService = new PaymentClaimsService();

  public getPaymentClaims = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllPaymentClaimsData: PaymentClaimsDto[] =
        await this.PaymentClaimsService.findAllPaymentClaimss();

      res
        .status(200)
        .json({ data: findAllPaymentClaimsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public uploadPaymentClaimsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const new_req_body = removeSyncFlag(req.body);
    try {
      const PaymentClaimsData: PaymentClaimsDto[] = new_req_body;

      const updatedData =
        await this.PaymentClaimsService.updatePaymentClaimsList(
          PaymentClaimsData
        );

      res.status(200).json({
        data: updatedData,
        message: "Payment claims Upload Complete",
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadPaymentClaimsList = async (
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
        await this.PaymentClaimsService.downloadPaymentClaimsList(
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

export default PaymentClaimsController;
