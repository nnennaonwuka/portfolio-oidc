import { EntityRepository, Repository } from "typeorm";
import { SurveyQuestionDto } from "@dtos/survey-question.dto";
import { SurveyQuestionEntity } from "@entities/survey-question.entity";
import { HttpException } from "@exceptions/HttpException";
import { SurveyQuestion } from "@interfaces/survey-question.interface";
import { isEmpty } from "@utils/util";

@EntityRepository()
class SurveyQuestionService extends Repository<SurveyQuestionEntity> {
  public async findAllSurveyQuestion(): Promise<SurveyQuestion[]> {
    const surveyQuestions: SurveyQuestion[] = await SurveyQuestionEntity.find();
    return surveyQuestions;
  }

  public async findSurveyQuestionById(
    surveyQuestionId: string
  ): Promise<SurveyQuestion> {
    if (isEmpty(surveyQuestionId))
      throw new HttpException(400, "You're not a SurveyQuestionId");

    const findSurveyQuestion: SurveyQuestion =
      await SurveyQuestionEntity.findOne({
        where: { survey_question_id: surveyQuestionId },
      });
    if (!findSurveyQuestion)
      throw new HttpException(409, "You're not a SurveyQuestionId");

    return findSurveyQuestion;
  }

  public async createSurveyQuestion(
    surveyQuestionData: SurveyQuestionDto
  ): Promise<SurveyQuestion> {
    if (isEmpty(surveyQuestionData))
      throw new HttpException(400, "You're not a SurveyQuestionData");

    const findSurveyQuestion: SurveyQuestion =
      await SurveyQuestionEntity.findOne({
        where: { survey_question_id: surveyQuestionData.survey_question_id },
      });
    if (findSurveyQuestion)
      throw new HttpException(
        409,
        `The id ${surveyQuestionData.survey_question_id} already exists`
      );

    const createSurveyQuestionData: SurveyQuestion =
      await SurveyQuestionEntity.create({ ...surveyQuestionData }).save();

    return createSurveyQuestionData;
  }

  public async updateSurveyQuestion(
    surveyQuestionId: string,
    SurveyQuestionData: SurveyQuestionDto
  ): Promise<SurveyQuestion> {
    if (isEmpty(SurveyQuestionData))
      throw new HttpException(400, "You're not SurveyQuestionData");

    const findSurveyQuestion: SurveyQuestion =
      await SurveyQuestionEntity.findOne({
        where: { survey_question_id: surveyQuestionId },
      });
    if (!findSurveyQuestion)
      throw new HttpException(409, "You're not SurveyQuestion");

    await SurveyQuestionEntity.update(
      { survey_question_id: surveyQuestionId },
      { ...SurveyQuestionData }
    );

    const updateSurveyQuestion: SurveyQuestion =
      await SurveyQuestionEntity.findOne({
        where: { survey_question_id: surveyQuestionId },
      });
    return updateSurveyQuestion;
  }

  public async deleteSurveyQuestion(
    surveyQuestionId: string
  ): Promise<SurveyQuestion> {
    if (isEmpty(surveyQuestionId))
      throw new HttpException(400, "You're not SurveyQuestionId");

    const findSurveyQuestion: SurveyQuestion =
      await SurveyQuestionEntity.findOne({
        where: { survey_question_id: surveyQuestionId },
      });
    if (!findSurveyQuestion)
      throw new HttpException(409, "You're not SurveyQuestion");

    await SurveyQuestionEntity.delete({ survey_question_id: surveyQuestionId });
    return findSurveyQuestion;
  }

  //sync up functionality
  public async updateSurveyQuestionList(
    surveyQuestionData: SurveyQuestionDto[]
  ): Promise<SurveyQuestion[]> {
    if (surveyQuestionData.length === 0)
      throw new HttpException(400, "SurveyQuestion data is empty");

    const updatedData = [];

    for (const item of surveyQuestionData) {
      if (item.survey_question_id) {
        const findExistingSurveyQuestion: SurveyQuestion =
          await SurveyQuestionEntity.findOne({
            where: { survey_question_id: item.survey_question_id },
          });

        if (findExistingSurveyQuestion) {
          await SurveyQuestionEntity.update(
            findExistingSurveyQuestion.survey_question_id,
            { ...item }
          );
          updatedData.push({
            survey_question_id: item.survey_question_id,
            status: 1,
          });
        } else {
          const createSurveyQuestion: SurveyQuestion =
            await SurveyQuestionEntity.create({ ...item }).save();
          updatedData.push({
            survey_question_id: createSurveyQuestion.survey_question_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadSurveyQuestionList(last_sync_time: string) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    // Fetch data from the table
    const surveyQuestionList = await SurveyQuestionEntity.createQueryBuilder(
      "table"
    )
      .select()
      .where("table.updated_at >= :lastDownloadTime", { lastDownloadTime })
      .getMany();

    return surveyQuestionList;
  }
}

export default SurveyQuestionService;
