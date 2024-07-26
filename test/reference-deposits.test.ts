import { ReferenceDepositsDto } from "@/dtos/reference-deposits.dto";
import { ReferenceDepositsEntity } from "@/entities/reference-deposits.entity";
import ReferenceDepositsService from "@/services/reference-deposits.service";
import { expect } from "chai";

describe("communityHeadService", () => {
  let referenceDepositsService: ReferenceDepositsService;

  before(() => {
    referenceDepositsService = new ReferenceDepositsService();
  });

  after(async () => {
    await ReferenceDepositsEntity.clear();
  });

  describe("findAll", () => {
    // Successfully update suggested faq data
    it("should successfully download all reference deposit list from the table", async () => {
      // Arrange

      // Act
      const DownloadData =
        await referenceDepositsService.findAllReferenceDeposits();
      expect(DownloadData).to.be.an("array");
      DownloadData.forEach((data) => {
        expect(data).to.have.property("reference_deposit_id");
      });
    }); // Added closing bracket for it block

    describe("syncDown", () => {
      // Successfully download community head data
      it("should successfully download suggested faq data", async () => {
        //Arrange
        const lastSyncTime = "0";
        const entity_id = "5";
        //Act
        const downloadables =
          await referenceDepositsService.downloadReferenceDepositsList(
            lastSyncTime,
            entity_id
          );
        //Assert
        expect(downloadables).to.be.an("array");
      });
    });
  });
});
