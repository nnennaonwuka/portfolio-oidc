import { expect } from "chai";
import { KnowledgeLogEntity } from "@/entities/knowledge-log.entity";
import KnowledgeLogService from "@/services/knowledge-log.service";
import { KnowledgeLogDto } from "@/dtos/knowledge-log.dto";


describe("KnowledgeLogService", () => {
  let knowledgeLogService: KnowledgeLogService;

  before(() => {
    knowledgeLogService = new KnowledgeLogService();
  });

  after(async () => {
    // Clean up after tests if needed
    await KnowledgeLogEntity.clear();
  });

  describe("updateKnowledgeLogList", () => {
    it("should successfully update knowledge log", async () => {
      // Arrange
      const knowledgeLogData: KnowledgeLogDto[] = [
        {
          knowledge_log_id: "1",
          portfolio_media_id: "portfolio_1",
          unique_member_id: "unique_member_1",
          ik_number: "ik_1",
          topic: "topic_1",
          activity_log_id: "activity_1",
          language: "english",
          staff_id: "staff_1",
          operator_id: "operator_1",
          imei: "imei_1",
          app_version: "1.0",
          date_logged: "2023-01-01",
        },
        // Add more test data as needed
      ];

      // Act
      const updatedKnowledgeLogList =
        await knowledgeLogService.updateKnowledgeLogList(knowledgeLogData);

      // Assert
      expect(updatedKnowledgeLogList).to.be.an("array");
      expect(updatedKnowledgeLogList).to.have.lengthOf(knowledgeLogData.length);
      updatedKnowledgeLogList.forEach((update) => {
        expect(update).to.have.property("knowledge_log_id");
        expect(update).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("downloadKnowledgeLogList", () => {
    it("should successfully download knowledge log list", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const staffId = "staff_1";
      const operatorId = "operator_1";

      // Act
      const downloadedKnowledgeLogList = await knowledgeLogService.downloadKnowledgeLogList(
        lastSyncTime,
        staffId,
        operatorId
      );

      // Assert
      expect(downloadedKnowledgeLogList).to.be.an("array");
    });
  });
});
