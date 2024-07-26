import { HttpException } from "@/exceptions/HttpException";
import { VisitationQuestions } from "@/interfaces/visitation-questions.interface";
import VisitationQuestionsService from "@/services/visitation-questions.service";

import { NextFunction, Request, Response } from "express";

class VisitationQuestionsController {
  public visitationQuestionsService = new VisitationQuestionsService();

  public getAllVisitationQuestions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllVisitationQuestions: VisitationQuestions[] =
        await this.visitationQuestionsService.findAllVisitationQuestions();

      res
        .status(200)
        .json({ data: findAllVisitationQuestions, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };
  public syncUpVisitationQuestions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const visitationQuestionsData = req.body;
    try {
      const visitationQuestions =
        await this.visitationQuestionsService.syncUpVisitationQuestions(
          visitationQuestionsData
        );

      res.status(201).json({
        data: visitationQuestions,
        message: "Data sync up successful",
      });
    } catch (error) {
      next(error);
    }
  };
  public syncDownVisitationQuestions = async (
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
      const visitationQuestions: VisitationQuestions[] =
        await this.visitationQuestionsService.syncDownVisitationQuestions(
          req.query.last_sync_time as string,
          req.query.staff_id as string,
          req.query.entity_id as string
        );
      if (visitationQuestions.length === 0) {
        res.status(200).json({ data: [], message: "No downloads were found" });
      } else {
        res.status(200).json({
          data: visitationQuestions,
          message: "Data sync down successful",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default VisitationQuestionsController;
