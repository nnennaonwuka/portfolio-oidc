import { ConfirmedDepositsEntity } from "@/entities/confirmed-deposits.entity";
import { ConfirmedDepositsInterface } from "@/interfaces/confirmed_deposits.interface";
import ConfirmedDepositsService from "@/services/confirmed-deposits.service";
import { expect } from "chai";

describe("ConfirmedDepositsService", () => {
  let confirmedDepositsService: ConfirmedDepositsService;

  before(() => {
    confirmedDepositsService = new ConfirmedDepositsService();
  });

  after(async () => {
    // Clean up after tests if needed
    await ConfirmedDepositsEntity.clear();
  });

  describe("findAllConfirmedDepositss", () => {
    it("should return an array of confirmed deposits", async () => {
      // Act
      const result = await confirmedDepositsService.findAllConfirmedDepositss();

      // Assert
      expect(result).to.be.an("array");
    });
  });

  describe("updateConfirmedDepositsList", () => {
    it("should successfully update confirmed deposits", async () => {
      // Arrange
      const confirmedDeposits: ConfirmedDepositsInterface[] = [
        {
          deposit_id: "1",
          operator_id: "operator_1",
          payment_claim_id: "payment_claim_1",
          bank_name: "Bank 1",
          date_of_confirmation: "2024-02-28",
          ik_number: "123456",
          amount_deposited: "100",
          app_version: "1.0.0",
          hub_id: "hub_id_1",
          imei: "imei_1",
          status: "0",
        },
        // Add more test data as needed
      ];

      // Act
      const result = await confirmedDepositsService.updateConfirmedDepositsList(
        confirmedDeposits
      );

      // Assert
      expect(result).to.be.an("array");
      expect(result).to.have.lengthOf(confirmedDeposits.length);
      result.forEach((data) => {
        expect(data).to.have.property("deposit_id");
        expect(data).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("downloadConfirmedDepositsList", () => {
    it("should successfully download confirmed deposits based on last_sync_time and entity_id", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const entityId = "23"; // Replace with the actual entity ID

      // Act
      const result =
        await confirmedDepositsService.downloadConfirmedDepositsList(
          lastSyncTime,
          entityId
        );

      // Assert
      expect(result).to.be.an("array");
    });
  });
});
