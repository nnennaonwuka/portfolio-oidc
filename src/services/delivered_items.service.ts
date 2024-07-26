import { EntityRepository, Repository } from "typeorm";
import DeliveredItem from "@/entities/delivered_items.entity";
import DeliveredItemsInterface from "@/interfaces/delivered_items.interface";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository(DeliveredItem)
class DeliveredItemsService extends Repository<DeliveredItem> {
  public async synchronizeDown(
    last_sync_time: string,
    entity_id
  ): Promise<DeliveredItemsInterface[]> {
    try {
      //Check if service can be accessed by entity id passed
      const entityGroups = [CONSTANTS.SHP_Member_Success];

      const entityArr = await getEntityArray(entityGroups);

      if (entity_id && !entityArr.includes(entity_id.trim())) {
        return [];
      }

      const givenSyncTime = new Date(last_sync_time).toISOString();
      const DeliveredItems: DeliveredItemsInterface[] =
        await DeliveredItem.createQueryBuilder("table")
          .select()
          .where("table.updated_at >= :givenSyncTime", { givenSyncTime })
          .getMany();
      return DeliveredItems;
    } catch (err) {
      throw err;
    }
  }

  public async synchronizeUp(
    DeliveredItems: DeliveredItem[]
  ): Promise<Array<{}>> {
    const updatedData = await Promise.all(
      DeliveredItems.map(async (eachDeliveredItem) => {
        try {
          await DeliveredItem.save(eachDeliveredItem);
          return {
            entity_id: eachDeliveredItem.entity_id,
            status: 1,
            message: "Item was successfully saved/updated",
          };
        } catch (err) {
          return {
            entity_id: eachDeliveredItem.entity_id,
            status: 0,
            message: err.message,
          };
        }
      })
    );
    return updatedData;
  }
}

export default DeliveredItemsService;
