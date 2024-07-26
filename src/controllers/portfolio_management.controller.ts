import { HttpException } from "@/exceptions/HttpException";
import { PortfolioManagement } from "@/interfaces/portfolio-management.interface";
import PortfolioManagementAssignmentService from "@/services/portfolio_management.service";

import { NextFunction, Request, Response } from "express";

class PortfolioManagementAssignmentController {
  public PortfolioManagementAssignmentService =
    new PortfolioManagementAssignmentService();

  public syncDownPortfolioManagementAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.query.last_sync_time || !req.query.hub_id) {
        throw new HttpException(
          400,
          "Please include appropriate query parameters with last_sync_time and hub_id"
        );
      }

      const staffId = req.query.staff_id
        ? (req.query.staff_id as string)
        : null;

      const PortfolioManagementAssignmentData: PortfolioManagement[] =
        await this.PortfolioManagementAssignmentService.syncDownPortfolioManagementAssignment(
          req.query.last_sync_time as string,
          staffId,
          req.query.hub_id as string
        );

      if (PortfolioManagementAssignmentData.length === 0) {
        res.status(200).json({ data: [], message: "No downloads were found" });
      } else {
        res.status(200).json({
          data: PortfolioManagementAssignmentData,
          message: "Data sync down successful",
        });
      }
    } catch (error) {
      next(error);
    }
  };

  public downloadDefaultingTgs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.query.staff_id)
        throw new HttpException(
          400,
          "Please include appropriate query parameters with staff_id"
        );
      const downloadedData =
        await this.PortfolioManagementAssignmentService.downloadTgs(
          req.query.staff_id as string
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

  public downloadPcsAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.query.staff_id)
        throw new HttpException(
          400,
          "Please include appropriate query parameters with staff_id"
        );
      const downloadedData =
        await this.PortfolioManagementAssignmentService.downloadPcos(
          req.query.staff_id as string
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

export default PortfolioManagementAssignmentController;
