import { HttpException } from "@/exceptions/HttpException";
import BankCardAssignmentInfoService from "@/services/bank_card_assignment_info.service";
import BankCardVerificationService from "@/services/bank_card_verification.service";
import { responseHandler } from "@/utils/response-handler.util";
import { NextFunction, Request, response, Response } from "express";

class BankCardVerificationController {
  private bankCardVerificationService = new BankCardVerificationService();

  public synchronizeDown = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.query.last_sync_time || !req.query.staff_id)
        throw new HttpException(
          400,
          "Please include appropriate request query string with last_sync_time and staff_id"
        );
      const data = await this.bankCardVerificationService.synchronizeDown(
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
      const data = await this.bankCardVerificationService.synchronizeUp(
        req.body
      );
      res.status(201).json({ message: "Data sync up completed", data });
    } catch (error) {
      next(error);
    }
  };

  public verifyCard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await this.bankCardVerificationService.verifyCard(req.body);
      console.log(data[0].state)
      if (data[0].state === 0) 
        responseHandler(res, data[0].message, data[0].status);
      
      else
      responseHandler(res, data[0].message, data[0].status, true, data[1]);
    
    } catch (error) {
      responseHandler(res, error.message || "An error occurred while retrieving Card details.", error.status || 500);
    
      }
  };
}

export default BankCardVerificationController;
