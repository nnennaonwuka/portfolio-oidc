import { expect } from "chai";
import { MeetingLogAttendanceEntity } from "@/entities/meeting-log-attendance.entity";
import MeetingLogAttendanceService from "@/services/meeting-log-attendance.service";
import { MeetingLogAttendanceDto } from "@/dtos/meeting-log-attendance.dto";

describe("MeetingLogAttendanceService", () => {
  let meetingLogAttendanceService: MeetingLogAttendanceService;

  before(() => {
    meetingLogAttendanceService = new MeetingLogAttendanceService();
  });

  after(async () => {
    // Clean up after tests if needed
    await MeetingLogAttendanceEntity.clear();
  });

  describe("updateMeetingLogAttendanceList", () => {
    it("should successfully update meeting log attendance", async () => {
      // Arrange
      const meetingLogAttendanceData:MeetingLogAttendanceDto[] = [
        {
          meeting_log_id: "1",
          unique_member_id: "member_1",
          ik_number: "ik_1",
          date_joined: "2023-01-01",
          verification_flag: 1,
          staff_id: "staff_1",
          operator_id: "operator_1",
          app_version: "1.0.0",
        },
        // Add more test data as needed
      ];

      // Act
      const updatedMeetingLogAttendance =
        await meetingLogAttendanceService.updateMeetingLogAttendanceList(
          meetingLogAttendanceData
        );

      // Assert
      expect(updatedMeetingLogAttendance).to.be.an("array");
      expect(updatedMeetingLogAttendance).to.have.lengthOf(
        meetingLogAttendanceData.length
      );
      updatedMeetingLogAttendance.forEach((update) => {
        expect(update).to.have.property("meeting_log_id");
        expect(update).to.have.property("unique_member_id");
        expect(update).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("downloadMeetingLogAttendanceList", () => {
    it("should successfully download meeting log attendance", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const staffId = "staff_id_1";
      const operatorId = "operator_id_1";

      // Act
      const downloadedMeetingLogAttendance =
        await meetingLogAttendanceService.downloadMeetingLogAttendanceList(
          lastSyncTime,
          staffId,
          operatorId
        );

      // Assert
      expect(downloadedMeetingLogAttendance).to.be.an("array");
    });
  });
});
