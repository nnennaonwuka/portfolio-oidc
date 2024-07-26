import { EntityRepository, Repository, getConnection } from "typeorm";
import { DefaultingTgDto } from "@dtos/defaultingTg.dto";
import { DefaultingTgEntity } from "@entities/defaulting-tg.entity";
import { HttpException } from "@exceptions/HttpException";
import { DefaultingTg } from "@interfaces/defaulting-tg.interface";
import { isEmpty } from "@utils/util";
import { PortfolioManagementAssignmentEntity } from "@/entities/porfolio-management.entity";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class DefaultingTgService extends Repository<DefaultingTgEntity> {
  private PortfolioManagementAssignmentEntity =
    PortfolioManagementAssignmentEntity;

  public async findAllDefaultingTg(): Promise<DefaultingTg[]> {
    const DefaultingTgs: DefaultingTg[] = await DefaultingTgEntity.find();
    return DefaultingTgs;
  }

  public async findDefaultingTgById(
    DefaultingTgId: string
  ): Promise<DefaultingTg> {
    if (isEmpty(DefaultingTgId))
      throw new HttpException(400, "You're not a DefaultingTgId");

    const findDefaultingTg: DefaultingTg = await DefaultingTgEntity.findOne({
      where: { tg_id: DefaultingTgId },
    });
    if (!findDefaultingTg)
      throw new HttpException(409, "You're not a DefaultingTg");

    return findDefaultingTg;
  }

  public async createDefaultingTg(
    DefaultingTgData: DefaultingTgDto
  ): Promise<DefaultingTg> {
    if (isEmpty(DefaultingTgData))
      throw new HttpException(400, "You're not a DefaultingTgData");

    const findDefaultingTg: DefaultingTg = await DefaultingTgEntity.findOne({
      where: { tg_id: DefaultingTgData.tg_id },
    });
    if (findDefaultingTg)
      throw new HttpException(
        409,
        `The id ${DefaultingTgData.tg_id} already exists`
      );

    const createDefaultingTgData: DefaultingTg =
      await DefaultingTgEntity.create({ ...DefaultingTgData }).save();

    return createDefaultingTgData;
  }

  public async updateDefaultingTg(
    DefaultingTgId: string,
    DefaultingTgData: DefaultingTgDto
  ): Promise<DefaultingTg> {
    if (isEmpty(DefaultingTgData))
      throw new HttpException(400, "You're not DefaultingTgData");

    const findDefaultingTg: DefaultingTg = await DefaultingTgEntity.findOne({
      where: { tg_id: DefaultingTgId },
    });
    if (!findDefaultingTg)
      throw new HttpException(409, "You're not DefaultingTg");

    await DefaultingTgEntity.update(DefaultingTgId, {
      ...DefaultingTgData,
    });

    const updateDefaultingTg: DefaultingTg = await DefaultingTgEntity.findOne({
      where: { tg_id: DefaultingTgId },
    });
    return updateDefaultingTg;
  }

  public async deleteDefaultingTg(
    DefaultingTgId: string
  ): Promise<DefaultingTg> {
    if (isEmpty(DefaultingTgId))
      throw new HttpException(400, "You're not DefaultingTgId");

    const findDefaultingTg: DefaultingTg = await DefaultingTgEntity.findOne({
      where: { tg_id: DefaultingTgId },
    });
    if (!findDefaultingTg)
      throw new HttpException(409, "You're not DefaultingTg");

    await DefaultingTgEntity.delete({ tg_id: DefaultingTgId });
    return findDefaultingTg;
  }

  //sync up functionality
  public async updateDefaultingTgList(
    DefaultingTgData: DefaultingTgDto[]
  ): Promise<DefaultingTg[]> {
    if (DefaultingTgData.length === 0)
      throw new HttpException(400, "DefaultingTg data is empty");

    const updatedData = [];

    for (const item of DefaultingTgData) {
      if (item.tg_id) {
        const findExistingDefaultingTg: DefaultingTg =
          await DefaultingTgEntity.findOne({
            where: { tg_id: item.tg_id },
          });

        if (findExistingDefaultingTg) {
          await DefaultingTgEntity.update(findExistingDefaultingTg.tg_id, {
            ...item,
          });
          updatedData.push({
            tg_id: item.tg_id,
            status: 1,
          });
        } else {
          const createDefaultingTg: DefaultingTg =
            await DefaultingTgEntity.create({ ...item }).save();
          updatedData.push({
            tg_id: createDefaultingTg.tg_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }
  //sync up functionality
  public async uploadPortfolioManagement(
    portfolioManagementData: PortfolioManagementAssignmentEntity[]
  ): Promise<Array<{}>> {
    const updatedData = await Promise.all(
      portfolioManagementData.map(async (eachPortfolioManagementData) => {
        try {
          await this.PortfolioManagementAssignmentEntity.save(
            eachPortfolioManagementData
          );
          return {
            ik_number: eachPortfolioManagementData.ik_number,
            status: 1,
          };
        } catch (error) {
          return {
            ik_number: eachPortfolioManagementData.ik_number,
            status: 0,
            message: error.message,
          };
        }
      })
    );
    return updatedData;
  }

  //sync down functionality
  public async downloadDefaultingTgList(
    last_sync_time: string,
    staff_id: string,
    hub_id: string,
    entity_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    //Check if service can be accessed by entity id passed
    const pcEntityGroup = [CONSTANTS.PC];
    const hubAgentEntityGroup = [CONSTANTS.HUB_AGENT]

    const pcEntityArr = await getEntityArray(pcEntityGroup);
    const hubAgentEntityArr = await getEntityArray(hubAgentEntityGroup);
    const allEntityArr = pcEntityArr.concat(hubAgentEntityArr);

    if (entity_id && (!allEntityArr.includes(entity_id.trim()))) {
      return [];
    };

    if (entity_id && pcEntityArr.includes(entity_id.trim())) {
      // Fetch data from the table for PC roles
      const downloadables = await getConnection().query(
        `SELECT * FROM "defaulting_tg_entity" 
        WHERE "tg_id" in (SELECT "ik_number" FROM "portfolio_management_assignment_entity" 
        WHERE ("pco" = '${staff_id}' OR "pcs" = '${staff_id}' OR "msb" = '${staff_id}' OR "mik" = '${staff_id}' OR "lmik" = '${staff_id}' OR "lmik_seed" = '${staff_id}' OR "mik_seed" = '${staff_id}'OR "bgt" = '${staff_id}' OR "bgt_seed" = '${staff_id}')) 
        AND "updated_at">=TIMESTAMP'${lastDownloadTime}' `
      );
      return downloadables;
    }

    if (entity_id && hubAgentEntityArr.includes(entity_id.trim())) {
      // Fetch data from the table for hub agents
      const downloadables = await getConnection().query(
        `SELECT * FROM "defaulting_tg_entity" 
        WHERE "tg_id" in (SELECT "ik_number" FROM "portfolio_management_assignment_entity" 
        WHERE "hub" = '${hub_id}') 
        AND "updated_at">=TIMESTAMP'${lastDownloadTime}' `
      );
      return downloadables;
    }
  }

  public async downloadTgList(staff_id: string, hub_id: string, entity_id: string) {
    //Check if service can be accessed by entity id passed
    const pcEntityGroup = [CONSTANTS.PC];
    const hubAgentEntityGroup = [CONSTANTS.HUB_AGENT]

    const pcEntityArr = await getEntityArray(pcEntityGroup);
    const hubAgentEntityArr = await getEntityArray(hubAgentEntityGroup);
    const allEntityArr = pcEntityArr.concat(hubAgentEntityArr);

    if (entity_id && (!allEntityArr.includes(entity_id.trim()))) {
      return [];
    }

    if (entity_id && pcEntityArr.includes(entity_id.trim())) {
      // Fetch data from the table
      const downloadables = await getConnection().query(
        `SELECT DISTINCT "tg_id" FROM "defaulting_tg_entity" WHERE "tg_id" in (SELECT "ik_number" FROM "portfolio_management_assignment_entity" WHERE ("pco" = '${staff_id}' OR "pcs" = '${staff_id}' OR "msb" = '${staff_id}' OR "mik" = '${staff_id}' OR "lmik" = '${staff_id}' OR "lmik_seed" = '${staff_id}' OR "mik_seed" = '${staff_id}'OR "bgt" = '${staff_id}' OR "bgt_seed" = '${staff_id}'))`
      );
      if (downloadables.length === 0) return [];
      const TgArray = downloadables.map((download) => download.tg_id);
      return TgArray;
    }

    if (entity_id && hubAgentEntityArr.includes(entity_id.trim())) {
      // Fetch data from the table for hub agents
      const downloadables = await getConnection().query(
        `SELECT DISTINCT "tg_id" FROM "defaulting_tg_entity" WHERE "tg_id" in (SELECT "ik_number" FROM "portfolio_management_assignment_entity" WHERE "hub" = '${hub_id}')`
      );
      if (downloadables.length === 0) return [];
      const TgArray = downloadables.map((download) => download.tg_id);
      return TgArray;
    }

    return [];
  }
}

export default DefaultingTgService;
