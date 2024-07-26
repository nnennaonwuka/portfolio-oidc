import { HttpException } from "@/exceptions/HttpException";
import RankService from "@/services/rank.service";
import { NextFunction, Request, Response } from "express";

class RankController {
  private RankService = new RankService();

  public syncDown = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.query.last_sync_time || !req.query.staff_id)
        throw new HttpException(
          400,
          "Please include appropriate request query string with staff_id or last_sync_time"
        );
      const data = await this.RankService.downloadRankList(
        req.query.staff_id as string,
        req.query.last_sync_time as string,
        req.query.hub_id as string,
        req.query.operator_id as string
      );

      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };
}

export default RankController;
