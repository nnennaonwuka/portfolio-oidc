import { HttpException } from "@/exceptions/HttpException";
import { DefaultRfLog } from "@/interfaces/deafualt_rf_log.interface";
import DefaultRfLogService from "@/services/default-rf-log.service";

import { NextFunction, Request, Response } from "express";

class DefaultRfLogController {
  public defaultRfLogService = new DefaultRfLogService();

  public getAllDefaultRfLog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllDefaultRfLog: DefaultRfLog[] =
        await this.defaultRfLogService.findAllDefaultRfLogs();

      res.status(200).json({ data: findAllDefaultRfLog, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };
  public syncUpDefaultRfLog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const DefaultRfLogData = req.body;
    try {
      const DefaultRfLog = await this.defaultRfLogService.syncUpDefaultRfLogs(
        DefaultRfLogData
      );

      res
        .status(201)
        .json({ data: DefaultRfLog, message: "Data sync up successful" });
    } catch (error) {
      next(error);
    }
  };
  public syncDownDefaultRfLog = async (
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
      const DefaultRfLog: DefaultRfLog[] =
        await this.defaultRfLogService.syncDownDefaultRfLogs(
          req.query.last_sync_time as string,
          req.query.entity_id as string
        );
      if (DefaultRfLog.length === 0) {
        res.status(200).json({ data: [], message: "No downloads were found" });
      } else {
        res
          .status(200)
          .json({ data: DefaultRfLog, message: "Data sync down successful" });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default DefaultRfLogController;
