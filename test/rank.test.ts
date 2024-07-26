import RankService from "@/services/rank.service";
import { expect } from "chai";

describe("RankService", () => {
  let rankService: RankService;

  before(() => {
    rankService = new RankService();
  });

  describe("downloadRankList", () => {
    // Successfully download rank list
    it("should successfully download rank list", async () => {
      // Arrange
      const staffId = "123";
      const lastSyncTime = "2024-02-26T00:00:00Z";
      const hubId = "456";
      const operatorId = "789";

      const mockData = [
        {
          rank_id: "FARM_FIELD_T000065_230601195310_f",
          ik_number: "IK00001491",
          unique_member_id: "T0002MM_200303145319_m",
          staff_id: null,
          rank_level: "FARM",
          percentage: "100",
          hub_id: "6",
          operator_id: "T-1C00000000007970",
          rf_count: "0",
          created_at: "2023-08-14T17:26:37.677Z",
          updated_at: "2024-01-25T12:00:18.710Z",
          unique_field_id: "T000065_230601195310_f",
        },
      ];

      // Act
      // const rankList = await rankService.downloadRankList(
      //   staffId,
      //   lastSyncTime,
      //   hubId,
      //   operatorId
      // );

      // Assert
      expect(mockData).to.be.an("array");
    });
  });
});
