import { expect } from "chai";
import MeetingAttendeesService from "@/services/meeting_attendees.service";
import { MeetingAttendeesEntity } from "@/entities/meeting_attendees.entity";
import { MeetingAttendees } from "@/interfaces/meeting_attendees.interface";


describe("MeetingAttendeesService", () => {
  let meetingAttendeesService: MeetingAttendeesService;

  before(() => {
    meetingAttendeesService = new MeetingAttendeesService();
  });

  after(async () => {
    // Clean up after tests if needed
    await MeetingAttendeesEntity.clear();
  });

  describe("Sync up", () => {
    it("should successfully add/ update data on meeting attendees table", async () => {
      // Arrange
      const attendees: MeetingAttendees[] = [
        {
            attendee_id: "A001",
            meeting_id: "M1001",
            staff_id: "S2001",
            first_name: "Chinedu",
            last_name: "Obi",
            sub_phase_flag: "SP1",
            sub_phase_activity: "Presentation",
            check_in_time: "2024-07-01T09:00:00",
            check_out_time: "2024-07-01T11:30:00",
            duration: "2h 30m",
            imei: "123456789012345",
            app_version: "1.4.2"
        },
        {
            attendee_id: "A002",
            meeting_id: "M1002",
            staff_id: "S2002",
            first_name: "Ngozi",
            last_name: "Adebayo",
            sub_phase_flag: "SP2",
            sub_phase_activity: "Workshop",
            check_in_time: "2024-07-01T10:00:00",
            check_out_time: "2024-07-01T12:00:00",
            duration: "2h",
            imei: "543210987654321",
            app_version: "1.4.2"
        }
    ];
    
    

      // Act
      const updatedAttendees = await meetingAttendeesService.updateMeetingAtendeesist(attendees as MeetingAttendeesEntity[]);

      // Assert
      expect(updatedAttendees).to.be.an("array");
      updatedAttendees.forEach((update) => {
        expect(update).to.have.property("attendee_id");
        expect(update).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("Sync down", () => {
    it("should successfully download meeting attendees table", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const entity_id = "1";

      // Act
      const downloads =
        await meetingAttendeesService.downloadMeetingLogList(
          lastSyncTime,
          entity_id
        );

      // Assert
      expect(downloads).to.be.an("array");
    });
  });
});
