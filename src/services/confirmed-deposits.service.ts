import { EntityRepository, getConnection, Repository } from "typeorm";
import { ConfirmedDepositsEntity } from "@/entities/confirmed-deposits.entity";
import { HttpException } from "@exceptions/HttpException";
import { ConfirmedDepositsInterface } from "@/interfaces/confirmed_deposits.interface";
import { ConfirmedDepositsDto } from "@/dtos/confirmed-deposits.dto";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class ConfirmedDepositsService extends Repository<ConfirmedDepositsEntity> {
  public async findAllConfirmedDepositss(): Promise<
    ConfirmedDepositsInterface[]
  > {
    const ConfirmedDeposits: ConfirmedDepositsInterface[] =
      await ConfirmedDepositsEntity.find();
    return ConfirmedDeposits;
  }

  // The logic to sync up confirmed deposits data
  public async updateConfirmedDepositsList(
    ConfirmedDeposits: ConfirmedDepositsDto[]
  ): Promise<ConfirmedDepositsInterface[]> {
    if (ConfirmedDeposits.length === 0)
      throw new HttpException(400, "confirmed deposits data is empty");

    const updatedData = [];

    for (const item of ConfirmedDeposits) {
      if (item.deposit_id) {
        const findExistingConfirmedDeposits: ConfirmedDepositsInterface =
          await ConfirmedDepositsEntity.findOne({
            where: { deposit_id: item.deposit_id },
          });

        if (findExistingConfirmedDeposits) {
          await ConfirmedDepositsEntity.update(
            findExistingConfirmedDeposits.deposit_id,
            {
              ...item,
            }
          );
          updatedData.push({
            deposit_id: item.deposit_id,
            status: 1,
          });
        } else {
          const createConfirmedDeposits: ConfirmedDepositsInterface =
            await ConfirmedDepositsEntity.create({ ...item }).save();
          updatedData.push({
            deposit_id: createConfirmedDeposits.deposit_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadConfirmedDepositsList(
    last_sync_time: string,
    entity_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.SHP_PC];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    // Fetch data from the table
    const downloadables = await getConnection().query(
      `SELECT * FROM "confirmed_deposits_entity" WHERE  "updated_at">=TIMESTAMP'${lastDownloadTime}' `
    );
    return downloadables;
  }
}

export default ConfirmedDepositsService;
