import { HttpException } from "@/exceptions/HttpException";
import { PaymentTimeline } from "@/interfaces/payment-timeline.interface";
import PaymentTimelineService from "@/services/payment-timeline.service";
import { NextFunction, Request, Response } from "express";

class PaymentTimelineController {
  public paymentTimelineService = new PaymentTimelineService();

  public getAllPaymentTimeline = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllPaymentTimeline: PaymentTimeline[] =
        await this.paymentTimelineService.findAllPaymentTimelines();

      res
        .status(200)
        .json({ data: findAllPaymentTimeline, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };
  public syncUpPaymentTimeline = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const PaymentTimelineData = req.body;
    try {
      const PaymentTimeline =
        await this.paymentTimelineService.syncUpPaymentTimelines(
          PaymentTimelineData
        );

      res
        .status(201)
        .json({ data: PaymentTimeline, message: "Data sync up successful" });
    } catch (error) {
      next(error);
    }
  };
  public syncDownPaymentTimeline = async (
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
      const paymentTimeline: PaymentTimeline[] =
        await this.paymentTimelineService.syncDownPaymentTimelines(
          req.query.last_sync_time as string,
          req.query.entity_id as string
        );
      if (paymentTimeline.length === 0) {
        res.status(200).json({ data: [], message: "No downloads were found" });
      } else {
        res.status(200).json({
          data: paymentTimeline,
          message: "Data sync down successful",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default PaymentTimelineController;
