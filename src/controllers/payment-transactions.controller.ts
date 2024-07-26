import { NextFunction, Request, Response } from "express";
import { PaymentTransactionsDto } from "@dtos/payment-transactions.dto";
import { PaymentTransactions } from "@interfaces/payment-transactions.interface";
import { HttpException } from "@/exceptions/HttpException";

import PaymentTransactionsService from "@services/payment-transactions.service";

class PaymentTransactionsController {
  public PaymentTransactionsService = new PaymentTransactionsService();

  public getPaymentTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllPaymentTransactionsData: PaymentTransactions[] =
        await this.PaymentTransactionsService.findAllPaymentTransactions();

      res
        .status(200)
        .json({ data: findAllPaymentTransactionsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public uploadPaymentTransactionsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const PaymentTransactionsData: PaymentTransactionsDto[] = req.body;

      const updatedData =
        await this.PaymentTransactionsService.updatePaymentTransactionsList(
          PaymentTransactionsData
        );

      res.status(200).json({
        data: updatedData,
        message: "PaymentTransactions Upload Complete",
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadPaymentTransactionsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);

    try {
      if (!req.query.last_sync_time)
        throw new HttpException(
          400,
          "Please include appropriate query paramaters with last_sync_time"
        );
      const downloadedData =
        await this.PaymentTransactionsService.downloadPaymentTransactionsList(
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

export default PaymentTransactionsController;
