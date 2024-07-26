import { SuggestedFaqDto } from "@/dtos/suggested-faq.dto";
import SuggestedFaqService from "@/services/suggested-faq.service";
import { expect } from "chai";

describe("communityHeadService", () => {
  let suggestedFaqService: SuggestedFaqService;

  before(() => {
    suggestedFaqService = new SuggestedFaqService();
  });

  describe("syncUp", () => {
    // Successfully update suggested faq data
    it("should successfully update suggested faq data", async () => {
      // Arrange
      const suggestedFaqData: SuggestedFaqDto[] = [
        {
          suggested_faq_id: "1",
          question: "string",
          meeting_log_id: "string",
          staff_id: "string",
          app_version: "1.0",
          imei: "987",
        },
        {
          suggested_faq_id: "2",
          question: "string+2",
          meeting_log_id: "string",
          staff_id: "string",
          app_version: "1.0",
          imei: "987",
        },
      ];

      // Act
      const updatedData = await suggestedFaqService.updateSuggestedFaqList(
        suggestedFaqData
      );
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(suggestedFaqData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("suggested_faq_id");
        expect(data).to.have.property("status", 1);
      });
    }); // Added closing bracket for it block

    describe("syncDown", () => {
      // Successfully download community head data
      it("should successfully download suggested faq data", async () => {
        //Arrange
        const lastSyncTime = "0";
        //Act
        const downloadables =
          await suggestedFaqService.downloadSuggestedFaqList(lastSyncTime);
        //Assert
        expect(downloadables).to.be.an("array");
      });
    });
  });
});
