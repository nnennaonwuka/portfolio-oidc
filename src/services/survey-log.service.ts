import { EntityRepository, Repository, getConnection } from "typeorm";
import { SurveyLogDto } from "@dtos/survey-log.dto";
import { SurveyLogEntity } from "@entities/survey-log.entity";
import { HttpException } from "@exceptions/HttpException";
import { SurveyLog } from "@interfaces/survey-log.interface";
import { getTgs } from "@/helpers/get_master_assignment";
import { getArrayString } from "@/helpers/array_sterilizer";

@EntityRepository()
class SurveyLogService extends Repository<SurveyLogEntity> {
  //sync up functionality
  public async updateSurveyLogList(
    surveyLogData: SurveyLogDto[]
  ): Promise<SurveyLog[]> {
    if (surveyLogData.length === 0)
      throw new HttpException(400, "surveyLog data is empty");

    const updatedData = [];

    for (const item of surveyLogData) {
      if (item.survey_log_id) {
        const findExistingSurveyLog: SurveyLog = await SurveyLogEntity.findOne({
          where: { survey_log_id: item.survey_log_id },
        });

        if (findExistingSurveyLog) {
          await SurveyLogEntity.update(findExistingSurveyLog.survey_log_id, {
            ...item,
          });
          updatedData.push({ survey_log_id: item.survey_log_id, status: 1 });
        } else {
          const createSurveyLog: SurveyLog = await SurveyLogEntity.create({
            ...item,
          }).save();
          updatedData.push({
            survey_log_id: createSurveyLog.survey_log_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadSurveyLogList(
    last_sync_time: string,
    staff_id: string,
    operator_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();
    if (operator_id) {
      const downloads = await getConnection().query(`
      SELECT * FROM survey_log_entity WHERE operator_id = '${operator_id}' AND updated_at >= TIMESTAMP'${lastDownloadTime}'
      `);
      return downloads;
    }

    const assignments = await getTgs(staff_id);
    const sterilizedTgs = getArrayString(assignments);
    const downloads = await getConnection().query(`
    SELECT * FROM survey_log_entity WHERE ik_number IN (${sterilizedTgs}) AND updated_at >= TIMESTAMP'${lastDownloadTime}'
    `);
    return downloads;
  }
}

export default SurveyLogService;
