import { NextFunction, Request, Response } from "express";
import { PortfolioMediaDto } from "@dtos/portfolio-media.dto";
import PortfolioMediaService from "@services/portfolio-media.service";

class PortfolioMediaController {
  public portfolioMediaService = new PortfolioMediaService();

  public uploadPortfolioMediaList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const portfolioMediaData: PortfolioMediaDto[] = req.body;

      const updatedData =
        await this.portfolioMediaService.updatePortfolioMediaList(
          portfolioMediaData
        );

      res
        .status(200)
        .json({ data: updatedData, message: "PortfolioMedia Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadPortfolioMediaList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);

    try {
      const downloadedData =
        await this.portfolioMediaService.downloadPortfolioMediaList(
          last_sync_time
        );

      if (downloadedData.length === 0) {
        res.status(200).json({ data: [], message: "No data were found" });
      } else {
        res
          .status(200)
          .json({ data: downloadedData, message: "Download Complete" });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default PortfolioMediaController;
