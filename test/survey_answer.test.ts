import { SurveyAnswerEntity } from "@/entities/survey-answer.entity";
import { SurveyAnswer } from "@/interfaces/survey-answer.interface";
import SurveyAnswerService from "@/services/survey-answer.service";
import { expect } from "chai";

describe("SurveyAnswerService", () => {
  let surveyAnswerService: SurveyAnswerService;

  before(() => {
    surveyAnswerService = new SurveyAnswerService();
  });

  describe("updateSurveyAnswerList", () => {
    it("should sync up survey answers", async () => {
      // Arrange
      const mockSurveyAnswerData: SurveyAnswer[] = [
        {
          survey_log_id: "1",
          survey_question_id: "1",
          unique_member_id: "member1",
          ik_number: "IK123",
          answer: "Yes",
          date_logged: "2024-02-27",
          staff_id: "staff1",
          app_version: "1.0",
          operator_id: "operator1",
          desc: "Answered positively",
          unique_entity_id: "unique_entity1",
          entity_id: "entity1",
          staff_entity_id: "staff_entity1",
          section: "Section A",
        },
        {
          survey_log_id: "2",
          survey_question_id: "2",
          unique_member_id: "member2",
          ik_number: "IK456",
          answer: "No",
          date_logged: "2024-02-28",
          staff_id: "staff2",
          app_version: "2.0",
          operator_id: "operator2",
          desc: "Answered negatively",
          unique_entity_id: "unique_entity2",
          entity_id: "entity2",
          staff_entity_id: "staff_entity2",
          section: "Section B",
        },
      ];

      // Act
      const updatedData = await surveyAnswerService.updateSurveyAnswerList(
        mockSurveyAnswerData as SurveyAnswerEntity[]
      );

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(mockSurveyAnswerData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("survey_question_id");
        expect(data).to.have.property("status", 1);
      });
    });
  });

  describe("downloadSurveyAnswerList", () => {
    it("should sync down survey answers", async () => {
      // Arrange
      const mockLastSyncTime = "2024-02-25T00:00:00.000Z";
      const mockStaffId = "staff1";
      const mockOperatorId = "operator1";

      // Act
      const downloadable = await surveyAnswerService.downloadSurveyAnswerList(
        mockLastSyncTime,
        mockStaffId,
        mockOperatorId
      );

      // Assert
      expect(downloadable).to.be.an("array");
      downloadable.forEach((data) => {
        expect(data).to.have.property("survey_question_id");
      });
    });
  });
});
