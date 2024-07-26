import VisitationInformationEntity from "@/entities/visitation-information.entity";
import { VisitationInformation } from "@/interfaces/visitation-information.interface";
import VisitationInformationService from "@/services/visitation-information.service";
import { expect } from "chai";

describe("VisitationInformationService", () => {
  let visitationInformationService: VisitationInformationService;

  before(() => {
    visitationInformationService = new VisitationInformationService();
  });

  after(async () => {
    await VisitationInformationEntity.clear();
  });

  describe("findAllVisitationInformation", () => {
    it("should return an array of visitation information", async () => {
      // Arrange

      // Act
      const result =
        await visitationInformationService.findAllVisitationInformation();

      // Assert
      expect(result).to.be.an("array");
    });
  });

  describe("syncUpVisitationInformation", () => {
    it("should successfully sync up visitation information", async () => {
      // Arrange
      const visitationInformationData: VisitationInformation[] = [
        {
          visitation_id: "1",
          tg_id: "tg_id_1",
          date_logged: "2024-02-28",
          comment: "First visitation",
          presence_flag: 1,
          member_verified_flag: 1,
          app_version: "1.0.0",
          imei: "imei_1",
          staff_id: "staff_id_1",
          phone_number: "1234567890",
          latitude: "123.456",
          longitude: "456.789",
          image_name: "image1.jpg",
        },
        {
          visitation_id: "2",
          tg_id: "tg_id_2",
          date_logged: "2024-02-28",
          comment: "Second visitation",
          presence_flag: 0,
          member_verified_flag: 0,
          app_version: "1.1.0",
          imei: "imei_2",
          staff_id: "staff_id_2",
          phone_number: "9876543210",
          latitude: "789.123",
          longitude: "321.654",
          image_name: "image2.jpg",
        },
      ];

      // Act
      const updatedData =
        await visitationInformationService.syncUpVisitationInformation(
          visitationInformationData as VisitationInformationEntity[]
        );

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(visitationInformationData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("tg_id");
        expect(data).to.have.property("status");
      });
    });
  });

  describe("syncDownVisitationInformation", () => {
    it("should successfully sync down visitation information", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const staffId = "staff_id";
      const entityId = "entity_id";

      // Act
      const result =
        await visitationInformationService.syncDownVisitationInformation(
          lastSyncTime,
          staffId,
          entityId
        );

      // Assert
      expect(result).to.be.an("array");
    });
  });
});
