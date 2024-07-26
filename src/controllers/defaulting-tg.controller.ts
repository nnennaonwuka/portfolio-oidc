import { NextFunction, Request, Response } from "express";
import { DefaultingTgDto } from "@dtos/defaultingTg.dto";
import { DefaultingTg } from "@interfaces/defaulting-tg.interface";
import DefaultingTgService from "@services/defaulting-tg.service";
import { HttpException } from "@/exceptions/HttpException";
import csv from "csv-parser";
import fs from "fs";
class DefaultingTgController {
  public DefaultingTgService = new DefaultingTgService();

  public getDefaultingTg = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllDefaultingTgData: DefaultingTg[] =
        await this.DefaultingTgService.findAllDefaultingTg();

      res
        .status(200)
        .json({ data: findAllDefaultingTgData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public uploadDefaultingTgList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const DefaultingTgData: DefaultingTgDto[] = req.body;

      const updatedData = await this.DefaultingTgService.updateDefaultingTgList(
        DefaultingTgData
      );

      res
        .status(200)
        .json({ data: updatedData, message: "DefaultingTg Upload Complete" });
    } catch (error) {
      next(error);
    }
  };
  public uploadPortfolioManagement = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!Array.isArray(req.body))
        throw new HttpException(
          400,
          "Please include the appropriate request body to sync up the data"
        );

      const data = await this.DefaultingTgService.uploadPortfolioManagement(
        req.body
      );
      res.status(201).json({ message: "Data sync up successful", data });
    } catch (error) {
      next(error);
    }
  };
  // public bulkUploadDefaultingTgList = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> => {
  //   const result = [];
  //   const file = req.file;
  //   console.log(file);
  //   const data = fs
  //     .createReadStream(req.file.path)
  //     .pipe(csv({}))
  //     .on("data", (data) => result.push(data))
  //     .on("end", () => {
  //       return result;
  //     });
  // };

  public downloadDefaultingTgList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);
    const staff_id = String(req.query.staff_id);

    try {
      if (!req.query.last_sync_time || !req.query.staff_id)
        throw new HttpException(
          400,
          "Please include appropriate query paramaters with last_sync_time and staff_id"
        );
        const last_sync_time = req.query.last_sync_time as string;
        const staff_id = req.query.staff_id as string;
        const hub_id = req.query.hub_id as string || ''; // Default to an empty string if hub_id is not provided
        const entity_id = req.query.entity_id as string;
      const downloadedData =
        await this.DefaultingTgService.downloadDefaultingTgList(
          last_sync_time,
          staff_id,
          hub_id,
          entity_id
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

  public downloadTgList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const staff_id = String(req.query.staff_id);

    try {
      if (!req.query.staff_id)
        throw new HttpException(
          400,
          "Please include appropriate query parameters with  staff_id"
        );
        const staff_id = req.query.staff_id as string;
        const hub_id = req.query.hub_id as string || ''; // Default to an empty string if hub_id is not provided
        const entity_id = req.query.entity_id as string;
      const downloadedData = await this.DefaultingTgService.downloadTgList(
        staff_id,
        hub_id,
        entity_id
      );

      res.status(200).json(downloadedData);
    } catch (error) {
      next(error);
    }
  };
}

export default DefaultingTgController;
