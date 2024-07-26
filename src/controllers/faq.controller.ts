import { NextFunction, Request, Response } from "express";
import { FaqDto } from "@dtos/faq.dto";
import { Faq } from "@interfaces/faq.interface";
import FaqService from "@services/faq.service";

class FaqController {
  public FaqService = new FaqService();

  public getFaq = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllFaqData: Faq[] = await this.FaqService.findAllFaq();

      res.status(200).json({ data: findAllFaqData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getFaqById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const faqId = String(req.params.id);
      const findOneFaqData: Faq = await this.FaqService.findFaqById(faqId);

      res.status(200).json({ data: findOneFaqData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createFaq = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const faqData: FaqDto = req.body;
      const createFaqData: Faq = await this.FaqService.createFaq(faqData);

      res.status(201).json({ data: createFaqData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateFaq = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const faqId = String(req.params.id);
      const faqData: FaqDto = req.body;
      const updateFaqData: Faq = await this.FaqService.updateFaq(
        faqId,
        faqData
      );

      res.status(200).json({ data: updateFaqData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteFaq = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const FaqId = String(req.params.id);
      const deleteFaqData: Faq = await this.FaqService.deleteFaq(FaqId);

      res.status(200).json({ data: deleteFaqData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };

  public uploadFaqList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const faqData: FaqDto[] = req.body;

      const updatedData = await this.FaqService.updateFaqList(faqData);

      res
        .status(200)
        .json({ data: updatedData, message: "Faq Upload Complete" });
    } catch (error) {
      next(error);
    }
  };

  public downloadFaqList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const last_sync_time = String(req.query.last_sync_time);

    try {
      const downloadedData = await this.FaqService.downloadFaqList(
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

export default FaqController;
