import { EntityRepository, Repository } from "typeorm";
import { TransferEntity } from "../entities/transfer.entity";
import { HttpException } from "@exceptions/HttpException";

@EntityRepository()
class TransferService extends Repository<TransferEntity> {
  //sync up functionality
  public async updateTransferList(
    transferData: TransferEntity[]
  ): Promise<any[]> {
    if (transferData.length === 0)
      throw new HttpException(400, "Transfer data is empty");

    const updatedData = await Promise.all(
      transferData.map(async (transferItem) => {
        try {
          await TransferEntity.save(transferItem);
          return {
            transfer_id: transferItem.transfer_id,
            status: 1,
          };
        } catch (err) {
          return {
            transfer_id: transferItem.transfer_id,
            status: 0,
            message: err.message,
          };
        }
      })
    );

    return updatedData;
  }

  //sync down functionality
  public async downloadTransferList(last_sync_time: string, hub_id: string) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    const transferPerHubList = await TransferEntity.createQueryBuilder("table")
      .select()
      .where("table.hub = :hub_id AND table.updated_at >= :lastDownloadTime", {
        hub_id,
        lastDownloadTime,
      })
      .getMany();

    return transferPerHubList;
  }
}

export default TransferService;
