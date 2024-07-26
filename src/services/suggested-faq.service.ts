import { EntityRepository, Repository } from "typeorm";
import { SuggestedFaqDto } from "@dtos/suggested-faq.dto";
import { SuggestedFaqEntity } from "@entities/suggested-faq.entity";
import { HttpException } from "@exceptions/HttpException";
import { SuggestedFaq } from "@interfaces/suggested-faq.interface";
import { isEmpty } from "@utils/util";

@EntityRepository()
class SuggestedFaqService extends Repository<SuggestedFaqEntity> {
  //sync up functionality
  public async updateSuggestedFaqList(
    SuggestedFaqData: SuggestedFaqDto[]
  ): Promise<SuggestedFaq[]> {
    if (SuggestedFaqData.length === 0)
      throw new HttpException(400, "SuggestedFaq data is empty");

    const updatedData = [];

    for (const item of SuggestedFaqData) {
      if (item.suggested_faq_id) {
        const findExistingSuggestedFaq: SuggestedFaq =
          await SuggestedFaqEntity.findOne({
            where: { suggested_faq_id: item.suggested_faq_id },
          });

        if (findExistingSuggestedFaq) {
          await SuggestedFaqEntity.update(
            findExistingSuggestedFaq.suggested_faq_id,
            { ...item }
          );
          updatedData.push({
            suggested_faq_id: item.suggested_faq_id,
            status: 1,
          });
        } else {
          const createSuggestedFaq: SuggestedFaq =
            await SuggestedFaqEntity.create({ ...item }).save();
          updatedData.push({
            suggested_faq_id: createSuggestedFaq.suggested_faq_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadSuggestedFaqList(last_sync_time: string) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    // Fetch data from the table
    const suggestedFaq = await SuggestedFaqEntity.createQueryBuilder("table")
      .select()
      .where("table.updated_at >= :lastDownloadTime", { lastDownloadTime })
      .getMany();
    return suggestedFaq;
  }
}

export default SuggestedFaqService;
