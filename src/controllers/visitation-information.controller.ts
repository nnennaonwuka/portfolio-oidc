import { HttpException } from "@/exceptions/HttpException";
import { VisitationInformation } from "@/interfaces/visitation-information.interface";
import VisitationInformationService from "@/services/visitation-information.service";

import { NextFunction, Request, Response } from "express";

class VisitationInformationController {
  public visitationInformationService = new VisitationInformationService();

  public getAllVisitationInformation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllVisitationInformation: VisitationInformation[] =
        await this.visitationInformationService.findAllVisitationInformation();

      res
        .status(200)
        .json({ data: findAllVisitationInformation, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };
  public syncUpVisitationInformation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const visitationInformationData = req.body;
    try {
      const visitationInformation =
        await this.visitationInformationService.syncUpVisitationInformation(
          visitationInformationData
        );

      res.status(201).json({
        data: visitationInformation,
        message: "Data sync up successful",
      });
    } catch (error) {
      next(error);
    }
  };
  public syncDownVisitationInformation = async (
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
      const visitationInformation: VisitationInformation[] =
        await this.visitationInformationService.syncDownVisitationInformation(
          req.query.last_sync_time as string,
          req.query.staff_id as string,
          req.query.entity_id as string
        );
      if (visitationInformation.length === 0) {
        res.status(200).json({ data: [], message: "No downloads were found" });
      } else {
        res.status(200).json({
          data: visitationInformation,
          message: "Data sync down successful",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default VisitationInformationController;
