import { WalletDetailsEntity } from "@/entities/wallet-details.entity";
import WalletDetailsService from "@/services/wallet_details.service";
import { expect } from "chai";

describe("WalletDetailsService", () => {
  let walletDetailsService: WalletDetailsService;

  before(() => {
    walletDetailsService = new WalletDetailsService();
  });

  after(async () => {
    // await ClassEntity.query(`TRUNCATE TABLE class_entity;`);
    await WalletDetailsEntity.clear();
  });

  describe("findAllWalletDetails", () => {
    // Successfully find all wallet details
    it("should successfully find all wallet details", async () => {
      // Act
      const walletDetails = await walletDetailsService.findAllWalletDetails();

      // Assert
      expect(walletDetails).to.be.an("array");
      // Add more assertions as needed based on the expected structure of returned data
    });
  });

  describe("downloadWalletDetailsList", () => {
    // Successfully download wallet details list
    it("should successfully download wallet details list", async () => {
      // Arrange
      const lastSyncTime = "2024-01-01";
      const entityId = "4"; // Example entity ID

      // Act
      const walletDetails =
        await walletDetailsService.downloadTgWalletDetailsList(
          lastSyncTime,
          entityId
        );

      // Assert
      expect(walletDetails).to.be.an("array");
      for (const data of walletDetails) {
        expect(data).to.have.property("staff_id");
      }
    });
  });

  // Add more tests as needed for other functions
});
