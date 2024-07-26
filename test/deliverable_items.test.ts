import DeliverableItem from "@/entities/deliverable_items.entity";
import DeliverableItemsInterface from "@/interfaces/deliverable_items.interface";
import DeliverableItemsService from "@/services/deliverable_items.service";
import { expect } from "chai";

describe("DeliverableItemsService", () => {
  let deliverableItemsService: DeliverableItemsService;

  before(() => {
    deliverableItemsService = new DeliverableItemsService();
  });

  after(async () => {
    // Clean up after tests if needed
    await DeliverableItem.clear();
  });

  describe("synchronizeDown", () => {
    it("should return an array of deliverable items synced down based on last_sync_time and entity_id", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const entityId = "5";

      // Act
      const result = await deliverableItemsService.synchronizeDown(
        lastSyncTime,
        entityId
      );

      // Assert
      expect(result).to.be.an("array");
    });
  });

  describe("synchronizeUp", () => {
    it("should successfully sync up deliverable items", async () => {
      // Arrange
      const deliverableItemsData: DeliverableItemsInterface[] = [
        {
          item_id: "item_id_1",
          item_name: "Item 1",
          max_number: 10,
          entered_item_info: "Info 1",
          qr_flag: 1,
          qr_regex: "regex",
          reason_list: "Reason 1",
        },
        // Add more test data as needed
      ];

      // Act
      const updatedData = await deliverableItemsService.synchronizeUp(
        deliverableItemsData as DeliverableItem[]
      );

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(deliverableItemsData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("item_id");
        expect(data).to.have.property("status");
        expect(data).to.have.property("message");
      });
    });
  });
});
