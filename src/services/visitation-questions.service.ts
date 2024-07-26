import VisitationQuestionsEntity from "@/entities/visitation-questions.entity";
import { HttpException } from "@/exceptions/HttpException";
import { VisitationQuestions } from "@/interfaces/visitation-questions.interface";
import { isEmpty } from "class-validator";
import { EntityRepository, getConnection, Repository } from "typeorm";
import DefaultingTgService from "./defaulting-tg.service";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class VisitationQuestionsService extends Repository<VisitationQuestionsEntity> {
  private readonly defaultingTgService = new DefaultingTgService();

  public async findAllVisitationQuestions(): Promise<VisitationQuestions[]> {
    const visitationQuestions: VisitationQuestions[] =
      await VisitationQuestionsEntity.find();
    return visitationQuestions;
  }

  public async syncUpVisitationQuestions(
    visitationQuestionsData: VisitationQuestionsEntity[]
  ): Promise<Array<{}>> {
    if (isEmpty(visitationQuestionsData))
      throw new HttpException(400, "transfer-details data is empty");

    const updatedData = await Promise.all(
      visitationQuestionsData.map(async (eachVisitationQuestions) => {
        try {
          await VisitationQuestionsEntity.save(eachVisitationQuestions);
          return {
            tg_id: eachVisitationQuestions.tg_id,
            visitation_id: eachVisitationQuestions.visitation_id,
            status: 1,
          };
        } catch (error) {
          return {
            tg_id: eachVisitationQuestions.tg_id,
            visitation_id: eachVisitationQuestions.visitation_id,
            status: 0,
            message: error.message,
          };
        }
      })
    );
    return updatedData;
  }

  public getArrayString = (arr) => {
    const arr_string = arr.join("','");
    return `'${arr_string}'`;
  };

  public async syncDownVisitationQuestions(
    last_sync_time: string,
    staff_id: string,
    entity_id: string
  ): Promise<VisitationQuestions[]> {
    const lastDownload = new Date(last_sync_time).toISOString();

    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.SHP_PC];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    const assignedTgs = this.getArrayString(
      await this.defaultingTgService.downloadTgList(staff_id, entity_id)
    );
    const downloadables = await getConnection().query(
      `SELECT * FROM "visitation_questions_entity" WHERE "tg_id" IN (${assignedTgs}) AND "updated_at">=TIMESTAMP'${lastDownload}' `
    );
    return downloadables;
  }
}

export default VisitationQuestionsService;
