import { HttpException } from "@/exceptions/HttpException";
import BankCardAssignmentInfoService from "@/services/bank_card_assignment_info.service";
import { responseHandler } from "@/utils/response-handler.util";
import { NextFunction, Request, Response } from "express";

class BankCardAssignmentInfoController {
  private bankCardAssignmentInfoService = new BankCardAssignmentInfoService();

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
      const data = await this.bankCardAssignmentInfoService.synchronizeDown(
        req.query.last_sync_time as string,
        req.query.entity_id as string
      );
      res.status(200).json({ message: "Data sync down completed", data });
    } catch (error) {
      next(error);
    }
  };

  public synchronizeUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!Array.isArray(req.body))
        throw new HttpException(
          400,
          "Please include the appropriate request body for sync up"
        );
      const data = await this.bankCardAssignmentInfoService.synchronizeUp(
        req.body
      );
      res.status(201).json({ message: "Data sync up completed", data });
    } catch (error) {
      next(error);
    }
  };

  public statusStats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await this.bankCardAssignmentInfoService.getStatusStats();
      if (data[0].state === 0)
        responseHandler(res, data[0].message, data[0].status, false, data[1]);
      else responseHandler(res, data[0].message, data[0].status, true, data[1]);

    } catch (error) {
      responseHandler(res, error.message || "An error occurred while retrieving Card details.", error.status || 500);
    
    }
  };
  public getCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const { page_num, page_size, status, search, sort } = req.query;

      const data: any[] = await this.bankCardAssignmentInfoService.getCards(
        page_num as string,
        page_size as string,
        status as string,
        search as string,
        sort as string
      );
      if (data[0].state === 0)
        responseHandler(res, data[0].message, data[0].status,false, data[1]);
      else responseHandler(res, data[0].message, data[0].status, true, data[1]);
    } catch (error) {
      responseHandler(
        res,
        error.message || "An error occurred while retrieving Card details.",
        error.status || 500
      );
    }
  };

  public handeleVerifiedCardDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { hub, unique_entity_id, cardId} = req.params;
      const data :any []= await this.bankCardAssignmentInfoService.getCardDetails(
        hub as string,
        unique_entity_id as string,
        cardId as string,
        "1"
      );
      if (data[0].state === 0)
        responseHandler(res, data[0].message, data[0].status, false, data[1]);
      else responseHandler(res, data[0].message, data[0].status, true, data[1]);

    } catch (error) {
      responseHandler(
        res,
        error.message || "An error occurred while retrieving Card details.",
        error.status || 500
      );
    }
  };
  public handleUnverifiedCardDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { hub, unique_entity_id, cardId} = req.params;
      const data :any []= await this.bankCardAssignmentInfoService.getCardDetails(
        hub as string,
        unique_entity_id as string,
        cardId as string,"0"
      );
      if (data[0].state === 0)
        responseHandler(res, data[0].message, data[0].status, false, data[1]);
      else responseHandler(res, data[0].message, data[0].status, true, data[1]);

    } catch (error) {
      responseHandler(
        res,
        error.message || "An error occurred while retrieving Card details.",
        error.status || 500
      );
    }
  };
  public handleUnresolvedCardDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { hub, unique_entity_id, cardId} = req.params;
      const data :any []= await this.bankCardAssignmentInfoService.getCardDetails(
        hub as string,
        unique_entity_id as string,
        cardId as string,"2"
      );
      if (data[0].state === 0)
        responseHandler(res, data[0].message, data[0].status, false, data[1]);
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

export default BankCardAssignmentInfoController;
