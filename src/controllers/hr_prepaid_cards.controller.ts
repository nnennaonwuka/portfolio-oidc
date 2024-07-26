import { NextFunction, Request, Response } from "express";
import { HttpException } from "@/exceptions/HttpException";
import HrPrepaidCardsService from "@/services/hr_prepaid_cards.service";
import { responseHandler } from "@/utils/response-handler.util";

class HrPrepaidCardsController {
  public hrPrepaidCardsService = new HrPrepaidCardsService();

  public synchronizeDown = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.query.last_sync_time)
        throw new HttpException(
          400,
          "Please include appropriate request query string with last_sync_time"
        );
      const data = await this.hrPrepaidCardsService.downloadCards(
        req.query.last_sync_time as string,
        req.query.entity_id as string
      );
      res.status(200).json({ message: "Data sync down completed", data });
    } catch (error) {
      next(error);
    }
  };
  public getPreloadedCards = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const data = await this.hrPrepaidCardsService.getAllCards(
        req.query.page as string,
        req.query.page_size as string,
        req.query.type as string,
        req.query.search as string,
        req.query.sort as string
      );
      if (data[0].state === 0)
        responseHandler(res, data[0].message, data[0].status);
      else responseHandler(res, data[0].message, data[0].status, true, data[1]);
    } catch (error) {
      responseHandler(
        res,
        error.message || "An error occurred while retrieving Card details.",
        error.status || 500
      );
    }
  };
}

export default HrPrepaidCardsController;
