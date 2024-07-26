import { ActivityLogEntity } from "@/entities/activity-log.entity";
import ActivityLogService from "@/services/activity-log.service";
import { expect } from "chai";
import { ActivityLog } from "@/interfaces/activity-log.interface";

describe("ActivityLogService", () => {
  let activityLogService: ActivityLogService;

  before(() => {
    activityLogService = new ActivityLogService();
  });

  after(async () => {
    // await ActivityLogEntity.query(`TRUNCATE TABLE activity_log_entity;`);
    await ActivityLogEntity.clear();
  });

  describe("updateActivityLogList", () => {
    it("should successfully update activity logs", async () => {
      // Arrange
      const activityLogData: ActivityLog[] = [
        {
          activity_log_id: "1",
          meeting_log_id: "1",
          unique_member_id: "1",
          ik_number: "123456",
          type: "type",
          sub_activity_log_id: "sub_1",
          staff_id: "staff_1",
          operator_id: "operator_1",
          imei: "imei_1",
          app_version: "1.0.0",
          date_logged: "2024-02-29",
        },
        // Add more test data as needed
      ];

      // Act
      const updatedData = await activityLogService.updateActivityLogList(
        activityLogData
      );

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(activityLogData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("activity_log_id");
        expect(data).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("downloadActivityLogList", () => {
    it("should successfully download activity logs based on operator_id", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const staffId = "staff_id";
      const operatorId = "operator_id";

      // Act
      const result = await activityLogService.downloadActivityLogList(
        lastSyncTime,
        staffId,
        operatorId
      );

      // Assert
      expect(result).to.be.an("array");
    });
  });
});
