import { NextFunction, Request, Response } from "express";
import { HttpException } from "@/exceptions/HttpException";
import TrustGroupGeneratedRfService from "@/services/trust_group_generated_rf.service";

class TrustGroupGeneratedRfController {
  public trustGroupGeneratedRfService = new TrustGroupGeneratedRfService();

  public syncUpTrustGroupGeneratedRf = async (
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

      const updatedData =
        await this.trustGroupGeneratedRfService.syncUpTrustGroupGeneratedRf(
          req.body
        );

      res.status(200).json({ data: updatedData, message: " Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadTrustGroupGeneratedRf = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (
        !req.query.last_sync_time ||
        (!req.query.staff_id && !req.query.hub_id)
      )
        throw new HttpException(
          400,
          "Please include appropriate request query string with last_sync_time and staff_id or hub_id"
        );
      const downloadedData =
        await this.trustGroupGeneratedRfService.downloadTrustGroupGeneratedRf(
          req.query.last_sync_time as string,
          req.query.staff_id as string,
          req.query.hub_id as string
        );
      res
        .status(200)
        .json({ data: downloadedData, message: "Download Complete" });
    } catch (error) {
      next(error);
    }
  };
}

export default TrustGroupGeneratedRfController;
