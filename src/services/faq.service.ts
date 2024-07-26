import { EntityRepository, Repository } from "typeorm";
import { FaqDto } from "@dtos/faq.dto";
import { FaqEntity } from "@entities/faq.entity";
import { HttpException } from "@exceptions/HttpException";
import { Faq } from "@interfaces/faq.interface";
import { isEmpty } from "@utils/util";

@EntityRepository()
class FaqService extends Repository<FaqEntity> {
  public async findAllFaq(): Promise<Faq[]> {
    const Faqs: Faq[] = await FaqEntity.find();
    return Faqs;
  }

  public async findFaqById(FaqId: string): Promise<Faq> {
    if (isEmpty(FaqId)) throw new HttpException(400, "You're not an Faq");

    const findFaq: Faq = await FaqEntity.findOne({ where: { faq_id: FaqId } });
    if (!findFaq) throw new HttpException(409, "You're not a Faq");

    return findFaq;
  }

  public async createFaq(FaqData: FaqDto): Promise<Faq> {
    if (isEmpty(FaqData)) throw new HttpException(400, "You're not an FaqData");

    const findFaq: Faq = await FaqEntity.findOne({
      where: { faq_id: FaqData.faq_id },
    });
    if (findFaq)
      throw new HttpException(409, `The id ${FaqData.faq_id} already exists`);

    const createFaqData: Faq = await FaqEntity.create({ ...FaqData }).save();

    return createFaqData;
  }

  public async updateFaq(FaqId: string, FaqData: FaqDto): Promise<Faq> {
    if (isEmpty(FaqData)) throw new HttpException(400, "You're not an FaqData");

    const findFaq: Faq = await FaqEntity.findOne({ where: { faq_id: FaqId } });
    if (!findFaq) throw new HttpException(409, "You're not an Faq");

    await FaqEntity.update(FaqId, { ...FaqData });

    const updateFaq: Faq = await FaqEntity.findOne({
      where: { faq_id: FaqId },
    });
    return updateFaq;
  }

  public async deleteFaq(FaqId: string): Promise<Faq> {
    if (isEmpty(FaqId)) throw new HttpException(400, "You're not an FaqId");

    const findFaq: Faq = await FaqEntity.findOne({ where: { faq_id: FaqId } });
    if (!findFaq) throw new HttpException(409, "You're not an Faq");

    await FaqEntity.delete({ faq_id: FaqId });
    return findFaq;
  }

  //sync up functionality
  public async updateFaqList(FaqData: FaqDto[]): Promise<Faq[]> {
    if (FaqData.length === 0) throw new HttpException(400, "Faq data is empty");

    const updatedData = [];

    for (const item of FaqData) {
      if (item.faq_id) {
        const findExistingFaqLog: Faq = await FaqEntity.findOne({
          where: { faq_id: item.faq_id },
        });

        if (findExistingFaqLog) {
          await FaqEntity.update(findExistingFaqLog.faq_id, { ...item });
          updatedData.push({ faq_id: item.faq_id, status: 1 });
        } else {
          const createFaq: Faq = await FaqEntity.create({ ...item }).save();
          updatedData.push({ faq_id: createFaq.faq_id, status: 1 });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadFaqList(last_sync_time: string) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    // Fetch data from the table
    const faqList = await FaqEntity.createQueryBuilder("table")
      .select()
      .where("table.updated_at >= :lastDownloadTime", { lastDownloadTime })
      .getMany();

    return faqList;
  }
}

export default FaqService;
