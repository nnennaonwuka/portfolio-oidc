import CommissionChargeDetailsEntity from "@/entities/commission_charge_details.entity";

import { HttpException } from "@/exceptions/HttpException";
import { CommissionChargeDetails } from "@/interfaces/commission_charge_details.interface";
import { isEmpty } from "class-validator";
import { EntityRepository, getConnection, Repository } from "typeorm";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class CommissionChargeDetailsService extends Repository<CommissionChargeDetailsEntity> {
  public async syncUpCommissionChargeDetails(
    CommissionChargeDetailsData: CommissionChargeDetailsEntity[]
  ): Promise<Array<{}>> {
    if (isEmpty(CommissionChargeDetailsData))
      throw new HttpException(400, "commision-charge-details data is empty");

    const updatedData = await Promise.all(
      CommissionChargeDetailsData.map(async (eachCommissionChargeDetails) => {
        try {
          await CommissionChargeDetailsEntity.save(eachCommissionChargeDetails);
          return {
            tg_id: eachCommissionChargeDetails.tg_id,
            date_logged: eachCommissionChargeDetails.date_logged,
            status: 1,
          };
        } catch (error) {
          return {
            tg_id: eachCommissionChargeDetails.tg_id,
            date_logged: eachCommissionChargeDetails.date_logged,
            status: 0,
            message: error.message,
          };
        }
      })
    );
    return updatedData;
  }

  public async syncDownCommissionChargeDetails(
    last_sync_time: string,
    entity_id: string
  ): Promise<CommissionChargeDetails[]> {
    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.PC];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    const lastDownload = new Date(last_sync_time).toISOString();
    const downloadables = await getConnection().query(
      `SELECT * FROM "commission_charge_details_entity" WHERE "updated_at">=TIMESTAMP'${lastDownload}' `
    );
    return downloadables;
  }
}

export default CommissionChargeDetailsService;
