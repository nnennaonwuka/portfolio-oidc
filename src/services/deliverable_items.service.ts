import { EntityRepository, Repository } from "typeorm";
import DeliverableItem from "@entities/deliverable_items.entity";
import DeliverableItemsInterface from "@interfaces/deliverable_items.interface";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class DeliverableItemsService extends Repository<DeliverableItem> {
  public async synchronizeDown(
    last_sync_time: string,
    entity_id: string
  ): Promise<DeliverableItemsInterface[]> {
    try {
      //Check if service can be accessed by entity id passed
      const entityGroups = [CONSTANTS.SHP_Member_Success];

      const entityArr = await getEntityArray(entityGroups);

      if (entity_id && !entityArr.includes(entity_id.trim())) {
        return [];
      }

      const givenSyncTime = new Date(last_sync_time).toISOString();
      const deliverableItems: DeliverableItemsInterface[] =
        await DeliverableItem.createQueryBuilder("table")
          .select()
          .where("table.updated_at >= :givenSyncTime", { givenSyncTime })
          .getMany();
      return deliverableItems;
    } catch (err) {
      throw err;
    }
  }

  public async synchronizeUp(
    DeliverableItems: DeliverableItem[]
  ): Promise<Array<{}>> {
    const updatedData = await Promise.all(
      DeliverableItems.map(async (eachDeliverableItem) => {
        try {
          await DeliverableItem.save(eachDeliverableItem);
          return {
            item_id: eachDeliverableItem.item_id,
            status: 1,
            message: "Item was successfully saved/updated",
          };
        } catch (err) {
          return {
            item_id: eachDeliverableItem.item_id,
            status: 0,
            message: err.message,
          };
        }
      })
    );
    return updatedData;
  }
}

export default DeliverableItemsService;
