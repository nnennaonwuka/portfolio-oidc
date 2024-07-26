import { EntityRepository, Repository, getConnection } from "typeorm";
import { SurveyAnswerDto } from "@dtos/survey-answer.dto";
import { SurveyAnswerEntity } from "@entities/survey-answer.entity";
import { HttpException } from "@exceptions/HttpException";
import { SurveyAnswer } from "@interfaces/survey-answer.interface";
import {
  getStaff,
  getTgs,
  getPcRoleTgAssignment,
} from "@/helpers/get_master_assignment";
import { getArrayString } from "@/helpers/array_sterilizer";
import { getSurveyAnsPoints } from "@/helpers/get_answer_points";

@EntityRepository()
class SurveyAnswerService extends Repository<SurveyAnswerEntity> {
  //sync up functionality
  public async updateSurveyAnswerList(
    surveyAnswerData: SurveyAnswerDto[]
  ): Promise<SurveyAnswer[]> {
    if (surveyAnswerData.length === 0)
      throw new HttpException(400, "SurveyAnswer data is empty");

    const updatedData = [];

    for (const item of surveyAnswerData) {
      if (
        item.survey_question_id &&
        item.unique_member_id &&
        item.staff_id &&
        item.date_logged
      ) {
        const id = item.survey_question_id.split('_')[2];

        if ((Number(id) > 187 && Number(id) < 218 && Number(id) !== 200) || Number(id) === 369) {
          item.section = await getSurveyAnsPoints(id, item.answer);
        }

        const findExistingSurveyAnswer: SurveyAnswer =
          await SurveyAnswerEntity.findOne({
            where: {
              survey_question_id: item.survey_question_id,
              unique_member_id: item.unique_member_id,
              staff_id: item.staff_id,
              date_logged: item.date_logged,
            },
          });

        if (findExistingSurveyAnswer) {
          await SurveyAnswerEntity.update(
            {
              survey_question_id: findExistingSurveyAnswer.survey_question_id,
              unique_member_id: findExistingSurveyAnswer.unique_member_id,
              staff_id: findExistingSurveyAnswer.staff_id,
              date_logged: findExistingSurveyAnswer.date_logged,
            },
            { ...item }
          );
          updatedData.push({
            survey_question_id: item.survey_question_id,
            unique_member_id: item.unique_member_id,
            staff_id: item.staff_id,
            date_logged: item.date_logged,
            status: 1,
          });
        } else {
          const createSurveyAnswer: SurveyAnswer =
            await SurveyAnswerEntity.create({ ...item }).save();
          updatedData.push({
            survey_question_id: createSurveyAnswer.survey_question_id,
            unique_member_id: createSurveyAnswer.unique_member_id,
            staff_id: createSurveyAnswer.staff_id,
            date_logged: createSurveyAnswer.date_logged,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadSurveyAnswerList(
    last_sync_time: string,
    staff_id: string,
    operator_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();
    const { role } = (await getStaff(staff_id)) ?? {};

    if (operator_id) {
      const downloads = await getConnection().query(`
      SELECT * FROM survey_answer_entity WHERE operator_id = '${operator_id}' AND updated_at >= TIMESTAMP'${lastDownloadTime}'
      `);
      return downloads;
    }

    if (role && role.trim().toLowerCase() === "pco") {
      const pcoAssignments = getArrayString(
        await getPcRoleTgAssignment(staff_id)
      );

      const downloads = await getConnection().query(`
        SELECT * FROM survey_answer_entity
        WHERE ik_number IN (${pcoAssignments}) AND updated_at >= TIMESTAMP'${lastDownloadTime}'
      `);
      return downloads;
    } else if (role && role.trim().toLowerCase() === "supervisor") {
      const downloads = await getConnection().query(`
        SELECT *
        FROM survey_answer_entity
        WHERE updated_at >= TIMESTAMP'${lastDownloadTime}'
        AND (((SPLIT_PART(survey_question_id, '_', 3)::int BETWEEN 188 AND 217) AND SPLIT_PART(survey_question_id, '_', 3)::int <> 200) OR SPLIT_PART(survey_question_id, '_', 3)::int = 369)
      `);
      return downloads;
    }

    const assignments = await getTgs(staff_id);

    const sterilizedTgs = getArrayString(assignments);
    const downloads = await getConnection().query(`
    SELECT * FROM survey_answer_entity WHERE ik_number IN (${sterilizedTgs}) AND updated_at >= TIMESTAMP'${lastDownloadTime}'
    `);
    return downloads;
  }
}

export default SurveyAnswerService;
