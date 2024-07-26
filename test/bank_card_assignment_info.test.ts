import  BankCardAssignmentInfo  from "@/entities/bank_card_assignment_info.entity";
import BankCardAssignmentInfoInterface from "@/interfaces/bank_card_assignment_info.interface";
import BankCardAssignmentInfoService from "@/services/bank_card_assignment_info.service";
import { expect } from "chai";

describe("BankCardAssignmentInfoService", () => {
  let bankCardAssignmentInfoService: BankCardAssignmentInfoService;

  before(() => {
    bankCardAssignmentInfoService = new BankCardAssignmentInfoService();
  });

  after(async () => {
    await BankCardAssignmentInfo.clear();
  });

  describe("synchronizeDown", () => {
    it("should successfully synchronize down bank card assignment info based on last_sync_time and entity_id", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const entityId = "7"; //example entity id

      // Act
      const result = await bankCardAssignmentInfoService.synchronizeDown(
        lastSyncTime,
        entityId
      );

      // Assert
      expect(result).to.be.an("array");
    });
  });

  describe("synchronizeUp", () => {
    it("should successfully synchronize up bank card assignment info", async () => {
      // Arrange
      const bankCardAssignmentInfos: BankCardAssignmentInfoInterface[] = [
        {
          unique_entity_id: "1",
          entity_id: "entity_id",
          staff_id: "staff_id",
          pan: "pan",
          expiry_date: "2025-01-01",
          assigned_date: "2024-01-01",
          ik_number: "123456",
          bg_card_number: "bg_card_number",
          app_version: "1.0.0",
          imei: "imei",
        },
        // Add more test data as needed
      ];

      // Act
      const result = await bankCardAssignmentInfoService.synchronizeUp(
        bankCardAssignmentInfos as BankCardAssignmentInfo[]
      );

      // Assert
      expect(result).to.be.an("array");
      expect(result).to.have.lengthOf(bankCardAssignmentInfos.length);
      result.forEach((data) => {
        expect(data).to.have.property("unique_entity_id");
        expect(data).to.have.property("status", 1); // Assuming status 1 means success
        expect(data).to.have.property("message", "Item was successfully saved/updated");
      });
    });
  });
});
