import { EntityRepository, getConnection, Repository } from "typeorm";
import { ReceiptDetailsEntity } from "@/entities/receipt_details.entity";
import { HttpException } from "@exceptions/HttpException";
import { ReceiptDetailsInterface } from "@/interfaces/receipt_details.interface";
import { ReceiptDetailsDto } from "@/dtos/receipt_details.dto";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class ReceiptDetailsService extends Repository<ReceiptDetailsEntity> {
  public async findAllReceiptDetailss(): Promise<ReceiptDetailsInterface[]> {
    const ReceiptDetailss: ReceiptDetailsInterface[] =
      await ReceiptDetailsEntity.find();
    return ReceiptDetailss;
  }

  // The logic to sync up Receipt Details data
  public async updateReceiptDetailsList(
    ReceiptDetailss: ReceiptDetailsDto[]
  ): Promise<ReceiptDetailsInterface[]> {
    if (ReceiptDetailss.length === 0)
      throw new HttpException(400, "Receipt Details data is empty");

    const updatedData = [];

    for (const item of ReceiptDetailss) {
      if (item.receipt_id) {
        const findExistingReceiptDetails: ReceiptDetailsInterface =
          await ReceiptDetailsEntity.findOne({
            where: { receipt_id: item.receipt_id },
          });

        if (findExistingReceiptDetails) {
          await ReceiptDetailsEntity.update(
            findExistingReceiptDetails.receipt_id,
            {
              ...item,
            }
          );
          updatedData.push({
            receipt_id: item.receipt_id,
            status: 1,
          });
        } else {
          const createReceiptDetails: ReceiptDetailsInterface =
            await ReceiptDetailsEntity.create({ ...item }).save();
          updatedData.push({
            receipt_id: createReceiptDetails.receipt_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadReceiptDetailsList(
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
      `SELECT * FROM "receipt_details_entity" WHERE  "updated_at">=TIMESTAMP'${lastDownloadTime}' `
    );
    return downloadables;
  }
}

export default ReceiptDetailsService;
