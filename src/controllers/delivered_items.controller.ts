import { HttpException } from "@/exceptions/HttpException";
import DeliveredItemsService from "@/services/delivered_items.service";
import { NextFunction, Request, Response } from "express";

class DeliveredItemsController {
  private DeliveredItemsService = new DeliveredItemsService();

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
      const data = await this.DeliveredItemsService.synchronizeDown(
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
      const data = await this.DeliveredItemsService.synchronizeUp(req.body);
      res.status(201).json({ message: "Data sync up completed", data });
    } catch (error) {
      next(error);
    }
  };
}

export default DeliveredItemsController;
