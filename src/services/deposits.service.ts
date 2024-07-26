import { EntityRepository, getConnection, Repository } from "typeorm";
import { DepositsEntity } from "@/entities/deposits.entity";
import { HttpException } from "@exceptions/HttpException";
import { DepositsInterface } from "@/interfaces/deposits.interface";
import { DepositsDto } from "@/dtos/deposits.dto";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class DepositsService extends Repository<DepositsEntity> {
  public async findAllDeposits(): Promise<DepositsInterface[]> {
    const Deposits: DepositsInterface[] = await DepositsEntity.find();
    return Deposits;
  }

  // // The logic to sync up Deposits data
  public async updateDepositsList(
    Deposits: DepositsInterface[]
  ): Promise<DepositsInterface[]> {
    if (Deposits.length === 0)
      throw new HttpException(400, "Deposits data is empty");

    const updatedData = [];

    for (const item of Deposits) {
      if (item.deposit_id) {
        const findExistingDeposits: DepositsInterface =
          await DepositsEntity.findOne({
            where: { deposit_id: item.deposit_id },
          });

        if (findExistingDeposits) {
          await DepositsEntity.update(findExistingDeposits.deposit_id, {
            ...item,
          });
          updatedData.push({
            deposit_id: item.deposit_id,
            status: 1,
          });
        } else {
          const createDeposits: DepositsInterface = await DepositsEntity.create(
            { ...item }
          ).save();
          updatedData.push({
            deposit_id: createDeposits.deposit_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadDepositsList(last_sync_time: string, entity_id: string) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.SHP_PC];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    // Fetch data from the table
    const downloadables = await getConnection().query(
      `SELECT * FROM "deposits_entity" WHERE  "updated_at">=TIMESTAMP'${lastDownloadTime}' `
    );
    return downloadables;
  }
}

export default DepositsService;
