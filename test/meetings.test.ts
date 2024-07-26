import { expect } from "chai";
import MeetingsService from "@/services/meetings.service";
import { MeetingsEntity } from "@/entities/meetings.entity";
import { Meetings } from "@/interfaces/meetings.interface";


describe("MeetingsService", () => {
  let meetingsService: MeetingsService;

  before(() => {
    meetingsService = new MeetingsService();
  });

  after(async () => {
    // Clean up after tests if needed
    await MeetingsEntity.clear();
  });

  describe("Sync up", () => {
    it("should successfully add/ update data on meetings table", async () => {
      // Arrange
      const meetingsData:Meetings[] =
      [
        {
          meeting_id: "001",
          meeting_address: "10 Ikeja St, Suite 5",
          meeting_name: "Lagos Business Summit",
          staff_id: "A1001",
          community: "Ikeja",
          state: "Lagos",
          lga: "Ikeja",
          meeting_date: "2024-07-01",
          room_image: "room_image_url1.jpg",
          longitude: "3.3792",
          lattitude: "6.5244",
          check_in_count: 50,
          check_out_count: 45,
          training_material: "training_material1.pdf",
          meeting_start_time: "09:00",
          meeting_end_time: "11:00",
          imei: "123456789012345",
          app_version: "1.2.3"
        },
        {
            meeting_id: "002",
            meeting_address: "20 Wuse St, Floor 3",
            meeting_name: "Abuja Tech Workshop",
            staff_id: "A1002",
            community: "Wuse",
            state: "FCT",
            lga: "Municipal Area Council",
            meeting_date: "2024-07-15",
            room_image: "room_image_url2.jpg",
            longitude: "7.4951",
            lattitude: "9.0579",
            check_in_count: 40,
            check_out_count: 35,
            training_material: "training_material2.pdf",
            meeting_start_time: "10:00",
            meeting_end_time: "12:00",
            imei: "987654321098765",
            app_version: "2.3.4"
        }
    ]
    

      // Act
      const updatedMeetings = await meetingsService.updateMeetingsList(meetingsData as MeetingsEntity[]);

      // Assert
      expect(updatedMeetings).to.be.an("array");
      updatedMeetings.forEach((update) => {
        expect(update).to.have.property("meeting_id");
        expect(update).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("Sync down", () => {
    it("should successfully download meetings table", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const staffId = "staff_id_1";
      const entity_id = "1";

      // Act
      const downloads =
        await meetingsService.downloadMeetingsList(
          lastSyncTime,
          staffId,
          entity_id
        );

      // Assert
      expect(downloads).to.be.an("array");
    });
  });
});
