import  CommissionChargeDetailsEntity  from "@/entities/commission_charge_details.entity";
import { CommissionChargeDetails } from "@/interfaces/commission_charge_details.interface";
import CommissionChargeDetailsService from "@/services/commission_charge_details.service";
import { expect } from "chai";

describe("CommissionChargeDetailsService", () => {
  let commissionChargeDetailsService: CommissionChargeDetailsService;

  before(() => {
    commissionChargeDetailsService = new CommissionChargeDetailsService();
  });

  after(async () => {
    // await ClassEntity.query(`TRUNCATE TABLE class_entity;`);
    await CommissionChargeDetailsEntity.clear();
  });

  describe("syncUpCommissionChargeDetails", () => {
    it("should successfully sync up commission charge details", async () => {
      // Arrange
      const commissionChargeDetailsData: CommissionChargeDetails[] = [
        {
          tg_id: "tg_id_1",
          date_logged: "2024-02-28",
          amount: "100",
          commission_charge: "10",
          image_name: "image_name_1",
          comment: "Comment 1",
          staff_id: "staff_id_1",
          imei: "imei_1",
          app_version: "1.0.0",
        },
        // Add more test data as needed
      ];

      // Act
      const updatedData =
        await commissionChargeDetailsService.syncUpCommissionChargeDetails(
          commissionChargeDetailsData as CommissionChargeDetailsEntity[]
        );

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(commissionChargeDetailsData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("tg_id");
        expect(data).to.have.property("date_logged");
        expect(data).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("syncDownCommissionChargeDetails", () => {
    it("should successfully sync down commission charge details based on last_sync_time and entity_id", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const entityId = "entity_id";

      // Act
      const result = await commissionChargeDetailsService.syncDownCommissionChargeDetails(
        lastSyncTime,
        entityId
      );

      // Assert
      expect(result).to.be.an("array");
    });
  });
});
