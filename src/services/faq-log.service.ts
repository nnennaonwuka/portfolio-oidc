import { EntityRepository, Repository, getConnection } from "typeorm";
import { FaqLogDto } from "@dtos/faq-log.dto";
import { FaqLogEntity } from "@entities/faq-log.entity";
import { HttpException } from "@exceptions/HttpException";
import { FaqLog } from "@interfaces/faq-log.interface";
import { getTgs } from "@/helpers/get_master_assignment";
import { getArrayString } from "@/helpers/array_sterilizer";

@EntityRepository()
class FaqLogService extends Repository<FaqLogEntity> {
  //sync up functionality
  public async updateFaqLogList(FaqLogData: FaqLogDto[]): Promise<FaqLog[]> {
    if (FaqLogData.length === 0)
      throw new HttpException(400, "FaqLog data is empty");

    const updatedData = [];

    for (const item of FaqLogData) {
      if (item.faq_log_id) {
        const findExistingFaqLog: FaqLog = await FaqLogEntity.findOne({
          where: { faq_log_id: item.faq_log_id },
        });

        if (findExistingFaqLog) {
          await FaqLogEntity.update(findExistingFaqLog.faq_log_id, { ...item });
          updatedData.push({ faq_log_id: item.faq_log_id, status: 1 });
        } else {
          const createFaqLog: FaqLog = await FaqLogEntity.create({
            ...item,
          }).save();
          updatedData.push({ faq_log_id: createFaqLog.faq_log_id, status: 1 });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadFaqLogList(
    last_sync_time: string,
    staff_id: string,
    operator_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    if (operator_id) {
      const downloads = await getConnection().query(`
      SELECT * FROM faq_log_entity WHERE operator_id = '${operator_id}' AND updated_at >= TIMESTAMP'${lastDownloadTime}'
      `);
      return downloads;
    }
    const assignments = await getTgs(staff_id);

    const sterilizedTgs = getArrayString(assignments);
    const downloads = await getConnection().query(`
    SELECT * FROM faq_log_entity WHERE ik_number IN (${sterilizedTgs}) AND updated_at >= TIMESTAMP'${lastDownloadTime}'
    `);

    return downloads;
  }
}

export default FaqLogService;
