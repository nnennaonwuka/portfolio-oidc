import { expect } from "chai";
import { MemberCollectionCenterUpdateEntity } from "@/entities/member-collection-center-update.entity";
import MemberCollectionCenterUpdateService from "@/services/member-collection-center-update.service";
import { MemberCollectionCenterUpdate } from "@/interfaces/member-collection-center-update.interface";

describe("MemberCollectionCenterUpdateService", () => {
  let memberCollectionCenterUpdateService: MemberCollectionCenterUpdateService;

  before(() => {
    memberCollectionCenterUpdateService = new MemberCollectionCenterUpdateService();
  });

  after(async () => {
    // Clean up after tests if needed
    await MemberCollectionCenterUpdateEntity.clear();
  });

  describe("updateMemberCollectionCenterUpdateList", () => {
    it("should successfully update member collection center updates", async () => {
      // Arrange
      const memberCollectionCenterUpdateData: MemberCollectionCenterUpdate[] = [
        {
          unique_member_id: "1",
          ik_number: "ik_1",
          collection_center_id: "collection_center_1",
          imei: "imei_1",
          staff_id: "staff_1",
          app_version: "1.0.0",
          field_id: "field_1",
          approved_status: 1,
        },
      ];

      // Act
      const updatedMemberCollectionCenterUpdates =
        await memberCollectionCenterUpdateService.updateMemberCollectionCenterUpdateList(
          memberCollectionCenterUpdateData
        );

      // Assert
      expect(updatedMemberCollectionCenterUpdates).to.be.an("array");
      expect(updatedMemberCollectionCenterUpdates).to.have.lengthOf(
        memberCollectionCenterUpdateData.length
      );
      updatedMemberCollectionCenterUpdates.forEach((update) => {
        expect(update).to.have.property("unique_member_id");
        expect(update).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("downloadMemberCollectionCenterUpdateList", () => {
    it("should successfully download member collection center updates", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const staffId = "staff_id_1";

      // Act
      const downloadedUpdates = await memberCollectionCenterUpdateService.downloadMemberCollectionCenterUpdateList(
        lastSyncTime,
        staffId
      );

      // Assert
      expect(downloadedUpdates).to.be.an("array");
    });
  });
});
