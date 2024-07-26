import { EntityRepository, getConnection, Repository } from "typeorm";
import { WalletDetailsEntity } from "@/entities/wallet-details.entity";
import { HttpException } from "@exceptions/HttpException";
import { WalletDetailsInterface } from "@/interfaces/wallet-details.interface";
import { WalletDetailsDto } from "@/dtos/wallet-details.dto";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class WalletDetailsService extends Repository<WalletDetailsEntity> {
  public async findAllWalletDetails(): Promise<WalletDetailsInterface[]> {
    const OperatorWalletDetails: WalletDetailsInterface[] =
      await WalletDetailsEntity.find();
    return OperatorWalletDetails;
  }

  // // The logic to sync up operator wallet details data
  // public async updateOperatorWalletDetailsList(
  //   OperatorWalletDetails: OperatorWalletDetailsDto[]
  // ): Promise<OperatorWalletDetailsInterface[]> {
  //   if (OperatorWalletDetails.length === 0)
  //     throw new HttpException(400, "operator wallet details data is empty");

  //   const updatedData = [];

  //   for (const item of OperatorWalletDetails) {
  //     if (item.staff_id) {
  //       const findExistingOperatorWalletDetails: OperatorWalletDetailsInterface =
  //         await OperatorWalletDetailsEntity.findOne({
  //           where: { staff_id: item.staff_id },
  //         });

  //       if (findExistingOperatorWalletDetails) {
  //         await OperatorWalletDetailsEntity.update(
  //           findExistingOperatorWalletDetails.staff_id,
  //           {
  //             ...item,
  //           }
  //         );
  //         updatedData.push({
  //           staff_id: item.staff_id,
  //           status: 1,
  //         });
  //       } else {
  //         const createOperatorWalletDetails: OperatorWalletDetailsInterface =
  //           await OperatorWalletDetailsEntity.create({ ...item }).save();
  //         updatedData.push({
  //           staff_id: createOperatorWalletDetails.staff_id,
  //           status: 1,
  //         });
  //       }
  //     }
  //   }

  //   return updatedData;
  // }

  //sync down functionality
  public async downloadStaffWalletDetailsList(
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
      `
          SELECT unique_entity_id AS staff_id, account_name, account_number, bank_name, created_at, updated_at, role, entity_id 
          FROM "wallet_details_entity" WHERE  "updated_at">=TIMESTAMP'${lastDownloadTime}' 
      `
    );
    return downloadables;
  }

  //sync down functionality
  public async downloadTgWalletDetailsList(
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
      `
          SELECT * FROM "wallet_details_entity" WHERE  "updated_at">=TIMESTAMP'${lastDownloadTime}' 
      `
    );
    return downloadables;
  }
}

export default WalletDetailsService;
