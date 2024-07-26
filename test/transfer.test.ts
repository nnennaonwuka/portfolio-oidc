import TransferService from "@services/transfer.service";
import { expect } from "chai";

describe("communityHeadService", () => {
  let transferService: TransferService;

  before(() => {
    transferService = new TransferService();
  });

  describe("syncDown", () => {
    // Successfully download community head data
    it("should successfully download transfer service data", async () => {
      //Arrange
      const lastSyncTime = "0";
      const hubId = "12345";
      //Act
      const downloadables = await transferService.downloadTransferList(
        lastSyncTime,
        hubId
      );
      //Assert
      expect(downloadables).to.be.an("array");
    });
  });
});
