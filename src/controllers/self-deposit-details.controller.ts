import { HttpException } from "@/exceptions/HttpException";
import { SelfDepositDetails } from "@/interfaces/self-deposit-details.interface";
import SelfDepositDetailsService from "@/services/self-deposit-details.service";

import { NextFunction, Request, Response } from "express";

class SelfDepositDetailsController {
  public selfDepositDetailsService = new SelfDepositDetailsService();

  public getAllSelfDepositDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllSelfDepositDetails: SelfDepositDetails[] =
        await this.selfDepositDetailsService.findAllSelfDepositDetails();

      res
        .status(200)
        .json({ data: findAllSelfDepositDetails, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };
  public syncUpSelfDepositDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const selfDepositDetailsData = req.body;
    try {
      const selfDepositDetails =
        await this.selfDepositDetailsService.syncUpSelfDepositDetails(
          selfDepositDetailsData
        );

      res
        .status(201)
        .json({ data: selfDepositDetails, message: "Data sync up successful" });
    } catch (error) {
      next(error);
    }
  };
  public syncDownSelfDepositDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.query.last_sync_time || !req.query.staff_id)
        throw new HttpException(
          400,
          "Please include appropriate query parameters with last_sync_time and staff_id"
        );
      const selfDepositDetails: SelfDepositDetails[] =
        await this.selfDepositDetailsService.syncDownSelfDepositDetails(
          req.query.last_sync_time as string,
          req.query.staff_id as string,
          req.query.entity_id as string
        );
      if (selfDepositDetails.length === 0) {
        res.status(200).json({ data: [], message: "No downloads were found" });
      } else {
        res.status(200).json({
          data: selfDepositDetails,
          message: "Data sync down successful",
        });
      }
    } catch (error) {
      next(error);
    }
  };
  public getSelfDepositDetailsById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.query.tg_id || !req.query.date_logged)
        throw new HttpException(
          400,
          "Please include appropriate query parameters with tg_id and date_logged"
        );
      const selfDepositDetails: SelfDepositDetails =
        await this.selfDepositDetailsService.getSelfDepositDetailsById(
          req.query.tg_id as string,
          req.query.date_logged as string
        );
      res.status(200).json({ data: selfDepositDetails });
    } catch (error) {
      next(error);
    }
  };
  public updateSelfDepositDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (
        !req.query.tg_id ||
        !req.query.date_logged ||
        !req.query.payment_status
      )
        throw new HttpException(
          400,
          "Please include appropriate query parameters with tg_id, date_logged and payment_status"
        );
      const comment = req.body.comment;
      const selfDepositDetails: SelfDepositDetails =
        await this.selfDepositDetailsService.updateSelfDepositDetails(
          req.query.tg_id as string,
          req.query.date_logged as string,
          req.query.payment_status as string,
          comment as string
        );
      res.status(201).json({ data: selfDepositDetails });
    } catch (error) {
      next(error);
    }
  };
}

export default SelfDepositDetailsController;
