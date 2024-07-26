import { expect } from "chai";
import { FaqLogEntity } from "@/entities/faq-log.entity";
import FaqLogService from "@/services/faq-log.service";
import { HttpException } from "@exceptions/HttpException";
import { FaqLogDto } from "@/dtos/faq-log.dto";

describe("FaqLogService", () => {
  let faqLogService: FaqLogService;

  before(() => {
    faqLogService = new FaqLogService();
  });

  after(async () => {
    // Clean up after tests if needed
    await FaqLogEntity.clear();
  });

  describe("updateFaqLogList", () => {
    it("should successfully update FAQ logs", async () => {
      // Arrange
      const faqLogData : FaqLogDto[] = [
        {
          faq_log_id: "1",
          faq_id: "faq_1",
          unique_member_id: "member_1",
          ik_number: "ik_1",
          activity_log_id: "activity_1",
          date_logged: "2024-02-28",
          staff_id: "staff_1",
          operator_id: "operator_1",
          app_version: "1.0.0",
          imei: "imei_1",
        },
      ];

      // Act
      const updatedFaqLogs = await faqLogService.updateFaqLogList(faqLogData);

      // Assert
      expect(updatedFaqLogs).to.be.an("array");
      expect(updatedFaqLogs).to.have.lengthOf(faqLogData.length);
      updatedFaqLogs.forEach((log) => {
        expect(log).to.have.property("faq_log_id");
        expect(log).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("downloadFaqLogList", () => {
    it("should successfully download FAQ logs", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const staffId = "staff_id_1";
      const operatorId = "operator_id_1";

      // Act
      const downloadedLogs = await faqLogService.downloadFaqLogList(lastSyncTime, staffId, operatorId);

      // Assert
      expect(downloadedLogs).to.be.an("array");
    });
  });
});
