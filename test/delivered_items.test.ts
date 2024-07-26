import DeliveredItems from "@/entities/delivered_items.entity";
import DeliveredItemsService from "@/services/delivered_items.service";
import { expect } from "chai";
import DeliverableItemsInterface from "@/interfaces/deliverable_items.interface";
import DeliveredItemsInterface from "@/interfaces/delivered_items.interface";

describe("DeliveredItemsService", () => {
  let deliveredItemsService: DeliveredItemsService;

  before(() => {
    deliveredItemsService = new DeliveredItemsService();
  });

  after(async () => {
    // await ClassEntity.query(`TRUNCATE TABLE class_entity;`);
    await DeliveredItems.clear();
  });

  describe("synchronizeUp", () => {
    // Successfully synchronize up delivered items
    it("should successfully synchronize up delivered items", async () => {
      // Arrange
      const deliveredItems: DeliveredItemsInterface[] = [
        {
          delivered_item_id: "1",
          unique_receiver_id: "UR123",
          entity_id: "E123",
          staff_id: "S123",
          ik_number: "IK123",
          item_id: "I123",
          delivery_date: "2024-02-23",
          app_version: "1.0",
          imei: "IMEI123",
          hub_id: "H123",
          item_info: "Item information",
          item_amount: 100,
          reason: "Reason for delivery",
          picture_name: "delivery.jpg",
          delivery_id: "D123",
          sync_flag: 1,
        },
        {
          delivered_item_id: "2",
          unique_receiver_id: "UR456",
          entity_id: "E456",
          staff_id: "S456",
          ik_number: "IK456",
          item_id: "I456",
          delivery_date: "2024-02-23",
          app_version: "1.0",
          imei: "IMEI456",
          hub_id: "H456",
          item_info: "Item information",
          item_amount: 200,
          reason: "Reason for delivery",
          picture_name: "delivery.jpg",
          delivery_id: "D123",
          sync_flag: 1,
        },
      ];

      // Act
      const updatedData = await deliveredItemsService.synchronizeUp(
        deliveredItems as DeliveredItems[]
      );

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(deliveredItems.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("entity_id");
        expect(data).to.have.property("status");
        // Add more assertions as needed for other properties
      });
    });
  });

  describe("synchronizeDown", () => {
    // Successfully synchronize down delivered items
    it("should successfully synchronize down delivered items", async () => {
      // Arrange
      const lastSyncTime = "2024-01-01";
      const entityId = "6";

      // Act
      const deliveredItems = await deliveredItemsService.synchronizeDown(
        lastSyncTime,
        entityId
      );

      // Assert
      expect(deliveredItems).to.be.an("array");
      for (const data of deliveredItems) {
        expect(data).to.have.property("delivered_items_id");
      }
    });
  });
});
