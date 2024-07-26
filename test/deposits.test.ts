import { expect } from "chai";
import {DepositsEntity} from "@/entities/deposits.entity";
import DepositsService from "@/services/deposits.service";
import { DepositsInterface } from "@/interfaces/deposits.interface";

describe("DepositsService", () => {
  let depositsService: DepositsService;

  before(() => {
    depositsService = new DepositsService();
  });

  after(async () => {
    // Clean up after tests if needed
    await DepositsEntity.clear();
  });

  describe("findAllDeposits", () => {
    it("should return an array of deposits", async () => {
      // Act
      const result = await depositsService.findAllDeposits();

      // Assert
      expect(result).to.be.an("array");
    });
  });

  describe("updateDepositsList", () => {
    it("should successfully update deposits list", async () => {
      // Arrange
      const depositsData: DepositsInterface[]  = [
        {
          deposit_id: "1",
          date_of_deposit: "2024-02-28",
          bank_name: "Bank A",
          amount_deposited: "1000",
          description: "Deposit description",
          imei: "1234567890",
          app_version: "1.0",
          account_number: "123456789",
          receipt_id: "receipt123",
          depositor: "John Doe",
          time_of_deposit: "12:00 PM",
          status: 1,
          hub_id: "hub1",
          comment: "Test comment",
          status_updated_date: "2024-02-28",
          reference_deposit_id: "ref123",
          payment_details_id: "payment123",
          image_id: "image123",
          payment_mode: "cash",
        },
        // Add more test data as needed
      ];

      // Act
      const updatedData = await depositsService.updateDepositsList(depositsData as DepositsInterface[]);

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(depositsData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("deposit_id");
        expect(data).to.have.property("status", 1);
      });
    });
  });

  describe("downloadDepositsList", () => {
    it("should successfully download deposits list based on last_sync_time and entity_id", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const entityId = "5";

      // Act
      const result = await depositsService.downloadDepositsList(lastSyncTime, entityId);

      // Assert
      expect(result).to.be.an("array");
    });
  });
});
