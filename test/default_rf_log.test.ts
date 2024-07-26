import  DefaultRfLogEntity  from "@/entities/default-rf-log.entity";
import { DefaultRfLog } from "@/interfaces/deafualt_rf_log.interface";
import DefaultRfLogService from "@/services/default-rf-log.service";
import { expect } from "chai";

describe("DefaultRfLogService", () => {
  let defaultRfLogService: DefaultRfLogService;

  before(() => {
    defaultRfLogService = new DefaultRfLogService();
  });

  after(async () => {
    // Clean up after tests if needed
    await DefaultRfLogEntity.clear();
  });

  describe("findAllDefaultRfLogs", () => {
    it("should return an array of default RF logs", async () => {
      // Act
      const result = await defaultRfLogService.findAllDefaultRfLogs();

      // Assert
      expect(result).to.be.an("array");
    });
  });

  describe("syncUpDefaultRfLogs", () => {
    it("should successfully sync up default RF logs", async () => {
      // Arrange
      const defaultRfLogsData: DefaultRfLog[] = [
        {
          tg_id: "tg_id_1",
          rf_type: "rf_type_1",
          date_logged: "2024-02-28",
          date_solved: null,
          rf_status: 0,
          staff_id: "staff_id_1",
          contact_method: "phone",
          contact_person: "John Doe",
          staff_id_solved: null,
          imei: "imei_1",
          app_version: "1.0.0",
          rf_id: "rf_id_1",
          hub_id: "hub_id_1",
        },
        // Add more test data as needed
      ];

      // Act
      const updatedData =
        await defaultRfLogService.syncUpDefaultRfLogs(defaultRfLogsData as DefaultRfLogEntity[]);

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(defaultRfLogsData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("tg_id");
        expect(data).to.have.property("rf_type");
        expect(data).to.have.property("date_logged");
        expect(data).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("syncDownDefaultRfLogs", () => {
    it("should successfully sync down default RF logs based on last_sync_time and entity_id", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const entityId = "5";

      // Act
      const result = await defaultRfLogService.syncDownDefaultRfLogs(
        lastSyncTime,
        entityId
      );

      // Assert
      expect(result).to.be.an("array");
    });
  });
});
