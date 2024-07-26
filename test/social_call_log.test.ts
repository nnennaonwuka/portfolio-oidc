import { SocialCallLogEntity } from "@/entities/social-call-log.entity";
import { SocialCallLog } from "@/interfaces/social-call-log.interface";
import SocialCallLogService from "@/services/social-call-log.service";
import { expect } from "chai";

describe("SocialCallLogService", () => {
  let socialCallLogService: SocialCallLogService;

  before(() => {
    socialCallLogService = new SocialCallLogService();
  });

  after(async () => {
    await SocialCallLogEntity.clear();
  });

  describe("updateSocialCallLogList", () => {
    it("should successfully update social call logs", async () => {
      // Arrange
      const socialCallLogData: SocialCallLog[] = [
        {
          social_log_id: "1",
          comment: "Comment 1",
          activity_log_id: "activity_log_id_1",
          unique_member_id: "unique_member_id_1",
          ik_number: "ik_number_1",
          date_logged: "2024-02-28",
          imei: "imei_1",
          staff_id: "staff_id_1",
          app_version: "1.0.0",
          operator_id: "operator_id_1",
        },
        {
          social_log_id: "2",
          comment: "Comment 2",
          activity_log_id: "activity_log_id_2",
          unique_member_id: "unique_member_id_2",
          ik_number: "ik_number_2",
          date_logged: "2024-02-28",
          imei: "imei_2",
          staff_id: "staff_id_2",
          app_version: "1.1.0",
          operator_id: "operator_id_2",
        },
      ];

      // Act
      const updatedData = await socialCallLogService.updateSocialCallLogList(
        socialCallLogData as SocialCallLogEntity[]
      );

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(socialCallLogData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("social_log_id");
        expect(data).to.have.property("status");
      });
    });
  });

  describe("downloadSocialCallLogList", () => {
    it("should successfully download social call logs", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const staffId = "staff_id";

      // Act
      const result = await socialCallLogService.downloadSocialCallLogList(
        lastSyncTime,
        staffId
      );

      // Assert
      expect(result).to.be.an("array");
    });
  });
});
