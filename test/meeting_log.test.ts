import { expect } from "chai";
import { MeetingLogEntity } from "@/entities/meeting-log.entity";
import MeetingLogService from "@/services/meeting-log.service";
import { MeetingLogDto } from "@/dtos/meeting-log.dto";


describe("MeetingLogService", () => {
  let meetingLogService: MeetingLogService;

  before(() => {
    meetingLogService = new MeetingLogService();
  });

  after(async () => {
    // Clean up after tests if needed
    await MeetingLogEntity.clear();
  });

  describe("updateMeetingLogList", () => {
    it("should successfully update meeting logs", async () => {
      // Arrange
      const meetingLogData:MeetingLogDto[] = [
        {
          meeting_log_id: "1",
          meeting_config_id: "config_1",
          start_date: "2023-01-01",
          end_date: "2023-01-01",
          duration: "1 hour",
          no_of_attendees: 10,
          meeting_status: 1,
          staff_id: "staff_1",
          operator_id: "operator_1",
          imei: "imei_1",
          app_version: "1.0.0",
          failure_reason: "Meeting failed",
        },
        // Add more test data as needed
      ];

      // Act
      const updatedMeetingLogs = await meetingLogService.updateMeetingLogList(
        meetingLogData
      );

      // Assert
      expect(updatedMeetingLogs).to.be.an("array");
      expect(updatedMeetingLogs).to.have.lengthOf(meetingLogData.length);
      updatedMeetingLogs.forEach((update) => {
        expect(update).to.have.property("meeting_log_id");
        expect(update).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("downloadMeetingLogList", () => {
    it("should successfully download meeting logs", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const staffId = "staff_id_1";
      const operatorId = "operator_id_1";

      // Act
      const downloadedMeetingLogs =
        await meetingLogService.downloadMeetingLogList(
          lastSyncTime,
          staffId,
          operatorId
        );

      // Assert
      expect(downloadedMeetingLogs).to.be.an("array");
    });
  });
});
