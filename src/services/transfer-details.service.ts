import TransferDetailsEntity from "@/entities/transfer-details.entity";
import { PAYMENT_STATUS } from "@/enums/payment-status.enum";
import { HttpException } from "@/exceptions/HttpException";
import { TransferDetails } from "@/interfaces/transfer-details.interface";
import { isEmpty } from "class-validator";
import { Entity, EntityRepository, getConnection, Repository } from "typeorm";
import DefaultingTgService from "./defaulting-tg.service";

@EntityRepository()
class TransferDetailsService extends Repository<TransferDetailsEntity> {
  private readonly defaultingTgService = new DefaultingTgService();

  public async syncUpTransferDetails(
    TransferDetailsData: TransferDetailsEntity[]
  ): Promise<Array<{}>> {
    if (isEmpty(TransferDetailsData))
      throw new HttpException(400, "transfer-details data is empty");

    const updatedData = await Promise.all(
      TransferDetailsData.map(async (eachTransferDetails) => {
        try {
          await TransferDetailsEntity.save(eachTransferDetails);
          return {
            tg_id: eachTransferDetails.tg_id,
            date_logged: eachTransferDetails.date_logged,
            status: 1,
          };
        } catch (error) {
          return {
            tg_id: eachTransferDetails.tg_id,
            date_logged: eachTransferDetails.date_logged,
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

  public async syncDownTransferDetails(
    last_sync_time: string,
    staff_id: string
  ): Promise<TransferDetails[]> {
    const lastDownload = new Date(last_sync_time).toISOString();

    const assignedTgs = this.getArrayString(
      await this.defaultingTgService.downloadTgList(staff_id)
    );

    const downloadables = await getConnection().query(
      `SELECT * FROM "transfer_details_entity" WHERE "tg_id" IN (${assignedTgs}) AND "updated_at">=TIMESTAMP'${lastDownload}' `
    );
    return downloadables;
  }
}

export default TransferDetailsService;
