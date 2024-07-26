import { EntityRepository, getConnection, Repository } from "typeorm";
import { ReferenceDepositsEntity } from "@/entities/reference-deposits.entity";
import { HttpException } from "@exceptions/HttpException";
import { ReferenceDepositsInterface } from "@/interfaces/reference-deposits.interface";
import { ReferenceDepositsDto } from "@/dtos/reference-deposits.dto";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class ReferenceDepositsService extends Repository<ReferenceDepositsEntity> {
  public async findAllReferenceDeposits(): Promise<
    ReferenceDepositsInterface[]
  > {
    const ReferenceDeposits: ReferenceDepositsInterface[] =
      await ReferenceDepositsEntity.find();
    return ReferenceDeposits;
  }

  // // The logic to sync up ReferenceDeposits data
  // public async updateReferenceDepositsList(
  //   ReferenceDeposits: ReferenceDepositsDto[]
  // ): Promise<ReferenceDepositsInterface[]> {
  //   if (ReferenceDeposits.length === 0)
  //     throw new HttpException(400, "ReferenceDeposits data is empty");

  //   const updatedData = [];

  //   for (const item of ReferenceDeposits) {
  //     if (item.reference_deposit_id) {
  //       const findExistingReferenceDeposits: ReferenceDepositsInterface =
  //         await ReferenceDepositsEntity.findOne({
  //           where: { reference_deposit_id: item.reference_deposit_id },
  //         });

  //       if (findExistingReferenceDeposits) {
  //         await ReferenceDepositsEntity.update(findExistingReferenceDeposits.reference_deposit_id, {
  //           ...item,
  //         });
  //         updatedData.push({
  //           reference_deposit_id: item.reference_deposit_id,
  //           status: 1,
  //         });
  //       } else {
  //         const createReferenceDeposits: ReferenceDepositsInterface = await ReferenceDepositsEntity.create(
  //           { ...item }
  //         ).save();
  //         updatedData.push({
  //           reference_deposit_id: createReferenceDeposits.reference_deposit_id,
  //           status: 1,
  //         });
  //       }
  //     }
  //   }

  //   return updatedData;
  // }

  //sync down functionality
  public async downloadReferenceDepositsList(
    last_sync_time: string,
    entity_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.SHP];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    // Fetch data from the table
    const downloadables = await getConnection().query(
      `SELECT * FROM "reference_deposits_entity" WHERE  "updated_at">=TIMESTAMP'${lastDownloadTime}' `
    );
    return downloadables;
  }
}

export default ReferenceDepositsService;
