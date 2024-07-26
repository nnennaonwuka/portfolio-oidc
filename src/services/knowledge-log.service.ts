import { EntityRepository, Repository, getConnection } from "typeorm";
import { KnowledgeLogDto } from "@dtos/knowledge-log.dto";
import { KnowledgeLogEntity } from "@entities/knowledge-log.entity";
import { HttpException } from "@exceptions/HttpException";
import { KnowledgeLog } from "@interfaces/knowledge-log.interface";
import { getTgs } from "@/helpers/get_master_assignment";
import { getArrayString } from "@/helpers/array_sterilizer";

@EntityRepository()
class KnowledgeLogService extends Repository<KnowledgeLogEntity> {
  //sync up functionality
  public async updateKnowledgeLogList(
    KnowledgeLogData: KnowledgeLogDto[]
  ): Promise<KnowledgeLog[]> {
    if (KnowledgeLogData.length === 0)
      throw new HttpException(400, "KnowledgeLog data is empty");

    const updatedData = [];

    for (const item of KnowledgeLogData) {
      if (item.knowledge_log_id) {
        const findExistingKnowledgeLog: KnowledgeLog =
          await KnowledgeLogEntity.findOne({
            where: { knowledge_log_id: item.knowledge_log_id },
          });

        if (findExistingKnowledgeLog) {
          await KnowledgeLogEntity.update(
            findExistingKnowledgeLog.knowledge_log_id,
            { ...item }
          );
          updatedData.push({
            knowledge_log_id: item.knowledge_log_id,
            status: 1,
          });
        } else {
          const createKnowledgeLog: KnowledgeLog =
            await KnowledgeLogEntity.create({ ...item }).save();
          updatedData.push({
            knowledge_log_id: createKnowledgeLog.knowledge_log_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadKnowledgeLogList(
    last_sync_time: string,
    staff_id: string,
    operator_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();
    const assignments = await getTgs(staff_id);

    if (operator_id) {
      const downloads = await getConnection().query(`
      SELECT * FROM knowledge_log_entity WHERE operator_id='${operator_id}' AND updated_at >= TIMESTAMP'${lastDownloadTime}'
      `);
      return downloads;
    }

    const sterilizedTgs = getArrayString(assignments);
    const downloads = await getConnection().query(`
    SELECT * FROM knowledge_log_entity WHERE ik_number IN (${sterilizedTgs}) AND updated_at >= TIMESTAMP'${lastDownloadTime}'
    `);

    return downloads;
  }
}

export default KnowledgeLogService;
