import { NextFunction, Request, Response } from "express";
import { HttpException } from "@/exceptions/HttpException";
import OperatorPerformanceService from '../services/operator_performance.service';

class OperatorPerformanceController {
  public operatorPerformanceService = new OperatorPerformanceService();

  public synchronizeUp = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {

        if (!Array.isArray(req.body)) throw new HttpException(400, 'Please include the appropriate request body for sync up');
        const data = await this.operatorPerformanceService.updateOperatorPerformanceList(req.body);
        res.status(201).json({ message: 'Data sync up completed', data });
    } catch (error) {
      next(error);
    }
  };

  public synchronizeDown = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.query.last_sync_time || !req.query.hub_id) throw new HttpException(400, 'Please include appropriate request query string with last_sync_time and hub_id');
      const data = await this.operatorPerformanceService.downloadOperatorPerformanceList(req.query.last_sync_time as string, req.query.hub_id as string, req.query.entity_id as string);
      res.status(200).json({ message: 'Data sync down completed', data });
    } catch (error) {
      next(error);
    }
  };
}

export default OperatorPerformanceController;
