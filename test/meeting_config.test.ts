import { expect } from "chai";
import { MeetingConfigEntity } from "@/entities/meeting-config.entity";
import MeetingConfigService from "@/services/meeting-config.service";
import { MeetingConfigDto } from "@/dtos/meeting-config.dto";

describe("MeetingConfigService", () => {
  let meetingConfigService: MeetingConfigService;

  before(() => {
    meetingConfigService = new MeetingConfigService();
  });

  after(async () => {
    // Clean up after tests if needed
    await MeetingConfigEntity.clear();
  });

  describe("updateMeetingConfigList", () => {
    it("should successfully update meeting config", async () => {
      // Arrange
      const meetingConfigData: MeetingConfigDto[] = [
        {
          meeting_config_id: "1",
          type: "type_1",
          name: "name_1",
          min_size: 5,
          max_size: 10,
        },
        // Add more test data as needed
      ];

      // Act
      const updatedMeetingConfigList =
        await meetingConfigService.updateMeetingConfigList(meetingConfigData);

      // Assert
      expect(updatedMeetingConfigList).to.be.an("array");
      expect(updatedMeetingConfigList).to.have.lengthOf(
        meetingConfigData.length
      );
      updatedMeetingConfigList.forEach((update) => {
        expect(update).to.have.property("meeting_config_id");
        expect(update).to.have.property("status", 1); // Assuming status 1 means success
      });
    });

  describe("downloadMeetingConfigList", () => {
    it("should successfully download meeting config list", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";

      // Act
      const downloadedMeetingConfigList =
        await meetingConfigService.downloadMeetingConfigList(lastSyncTime);

      // Assert
      expect(downloadedMeetingConfigList).to.be.an("array");
    });
  });
});
})
