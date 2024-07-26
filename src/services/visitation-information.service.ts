import VisitationInformationEntity from "@/entities/visitation-information.entity";
import { HttpException } from "@/exceptions/HttpException";
import { VisitationInformation } from "@/interfaces/visitation-information.interface";
import { isEmpty } from "class-validator";
import { EntityRepository, getConnection, Repository } from "typeorm";
import DefaultingTgService from "./defaulting-tg.service";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class VisitationInformationService extends Repository<VisitationInformationEntity> {
  private readonly defaultingTgService = new DefaultingTgService();

  public getArrayString = (arr) => {
    const arr_string = arr.join("','");
    return `'${arr_string}'`;
  };

  public async findAllVisitationInformation(): Promise<
    VisitationInformation[]
  > {
    const visitationInformation: VisitationInformation[] =
      await VisitationInformationEntity.find();
    return visitationInformation;
  }

  public async syncUpVisitationInformation(
    visitationInformationData: VisitationInformationEntity[]
  ): Promise<Array<{}>> {
    if (isEmpty(visitationInformationData))
      throw new HttpException(400, "transfer-details data is empty");

    const updatedData = await Promise.all(
      visitationInformationData.map(async (eachVisitationInformation) => {
        try {
          await VisitationInformationEntity.save(eachVisitationInformation);
          return {
            tg_id: eachVisitationInformation.visitation_id,
            status: 1,
          };
        } catch (error) {
          return {
            tg_id: eachVisitationInformation.visitation_id,
            status: 0,
            message: error.message,
          };
        }
      })
    );
    return updatedData;
  }

  public async syncDownVisitationInformation(
    last_sync_time: string,
    staff_id: string,
    entity_id: string
  ): Promise<VisitationInformation[]> {
    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.SHP_PC];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    const assignedTgs = this.getArrayString(
      await this.defaultingTgService.downloadTgList(staff_id, entity_id)
    );
    console.log(assignedTgs);

    const lastDownload = new Date(last_sync_time).toISOString();
    const downloadables = await getConnection().query(
      `SELECT * FROM "visitation_information_entity" WHERE "tg_id" IN (${assignedTgs}) AND "updated_at">=TIMESTAMP'${lastDownload}' `
    );
    return downloadables;
  }
}

export default VisitationInformationService;
