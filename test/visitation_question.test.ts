import VisitationQuestionsEntity from "@/entities/visitation-questions.entity";
import { VisitationQuestions } from "@/interfaces/visitation-questions.interface";
import VisitationQuestionsService from "@/services/visitation-questions.service";
import { expect } from "chai";

describe("VisitationQuestionsService", () => {
  let visitationQuestionsService: VisitationQuestionsService;

  before(() => {
    visitationQuestionsService = new VisitationQuestionsService();
  });

  after(async () => {
    // await FOConfigEntity.query(`TRUNCATE TABLE fo_config_entity`);
    await VisitationQuestionsEntity.clear();
  });

  describe("findAllVisitationQuestions", () => {
    it("should return an array of visitation questions", async () => {
      // Arrange

      // Act
      const result =
        await visitationQuestionsService.findAllVisitationQuestions();

      // Assert
      expect(result).to.be.an("array");
    });
  });

  describe("syncUpVisitationQuestions", () => {
    it("should successfully sync up visitation questions", async () => {
      // Arrange
      const visitationQuestionsData: VisitationQuestions[] = [
        {
          tg_id: "tg_id_1",
          visitation_id: "visitation_id_1",
          date_logged: "2024-02-28",
          agreement_flag: 1,
          no_agreement_reason: "Reason 1",
          fo_name: "FO Name 1",
          statement_flag: 0,
          deliver_flag: 1,
          compliance_flag: 0,
          plan_flag: 1,
          frequency: "monthly",
          frequency_count: "1",
          minimum_amount: "100",
          completion_date: "2024-03-31",
          next_date: "2024-04-30",
          next_amount: "200",
          staff_id: "staff_id_1",
          imei: "imei_1",
          app_version: "1.0.0",
        },
        {
          tg_id: "tg_id_2",
          visitation_id: "visitation_id_2",
          date_logged: "2024-02-28",
          agreement_flag: 0,
          no_agreement_reason: "",
          fo_name: "FO Name 2",
          statement_flag: 1,
          deliver_flag: 0,
          compliance_flag: 1,
          plan_flag: 0,
          frequency: "weekly",
          frequency_count: "2",
          minimum_amount: "50",
          completion_date: "2024-03-15",
          next_date: "2024-03-22",
          next_amount: "75",
          staff_id: "staff_id_2",
          imei: "imei_2",
          app_version: "1.1.0",
        },
      ];

      // Act
      const updatedData =
        await visitationQuestionsService.syncUpVisitationQuestions(
          visitationQuestionsData as VisitationQuestionsEntity[]
        );

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(visitationQuestionsData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("visitation_id");
        expect(data).to.have.property("tg_id");
        expect(data).to.have.property("status");
      });
    });
  });

  describe("syncDownVisitationQuestions", () => {
    it("should successfully sync down visitation questions", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const staffId = "staff_id";
      const entityId = "entity_id";

      // Act
      const result =
        await visitationQuestionsService.syncDownVisitationQuestions(
          lastSyncTime,
          staffId,
          entityId
        );

      // Assert
      expect(result).to.be.an("array");
    });
  });
});
