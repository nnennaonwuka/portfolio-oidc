import { expect } from "chai";
import { FaqEntity } from "@/entities/faq.entity";
import FaqService from "@/services/faq.service";
import { FaqDto } from "@/dtos/faq.dto";


describe("FaqService", () => {
  let faqService: FaqService;

  before(() => {
    faqService = new FaqService();
  });

  after(async () => {
    // Clean up after tests if needed
    await FaqEntity.clear();
  });

  describe("findAllFaq", () => {
    it("should return an array of all FAQs", async () => {

      // Act
      const faqList = await faqService.findAllFaq();

      // Assert
      expect(faqList).to.be.an("array");
      expect(faqList).to.have.lengthOf(0); // Assuming no FAQ data is returned
    });
  });

  describe("createFaq", () => {
    it("should create a new FAQ", async () => {
      // Arrange
      const faqData :FaqDto = {
        faq_id: "1",
        faq_config_id: "config_1",
        question: "question_1",
        portfolio_media_id: "portfolio_1",
        additional_info: "additional_info_1",
      };

      // Act
      const createdFaq = await faqService.createFaq(faqData);

      // Assert
      expect(createdFaq).to.be.an("object");
      expect(createdFaq.faq_id).to.equal(faqData.faq_id);
    });
  });


  describe("findFaqById", () => {
    it("should return the FAQ with the given ID", async () => {
      // Arrange
      const faqId = "1";

      // Act
      const foundFaq = await faqService.findFaqById(faqId);

      // Assert
      expect(foundFaq).to.be.an("object");
      expect(foundFaq.faq_id).to.equal(faqId);
    });
  });


  describe("updateFaq", () => {
    it("should update the FAQ with the given ID", async () => {
      // Arrange
      const faqId = "1";
      const faqData: FaqDto = {
        faq_id: "1",
        faq_config_id: "config_1",
        question: "question_1",
        portfolio_media_id: "portfolio_1",
        additional_info: "additional_info_1",
      }

      // Act
      const updatedFaq = await faqService.updateFaq(faqId, faqData);

      // Assert
      expect(updatedFaq).to.be.an("object");
    })
  })


  describe("deleteFaq", () => {
    it("should delete the FAQ with the given ID", async () => {
      // Arrange
      const faqId = "1";

      // Act
      const deletedFaq = await faqService.deleteFaq(faqId);

      // Assert
      expect(deletedFaq).to.be.an("object");
      expect(deletedFaq.faq_id).to.equal(faqId);
    })
  })

  describe("updateFaqList", () => {
    it("should successfully update FAQ list", async () => {
      // Arrange
      const faqData: FaqDto[] = [
        {
          faq_id: "1",
          faq_config_id: "config_1",
          question: "question_1",
          portfolio_media_id: "portfolio_1",
          additional_info: "additional_info_1",
        },
        // Add more test data as needed
      ];

      // Act
      const updatedFaqList = await faqService.updateFaqList(faqData);

      // Assert
      expect(updatedFaqList).to.be.an("array");
      expect(updatedFaqList).to.have.lengthOf(faqData.length);
      updatedFaqList.forEach((update) => {
        expect(update).to.have.property("faq_id");
        expect(update).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("downloadFaqList", () => {
    it("should successfully download FAQ list", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";

      // Act
      const downloadedFaqList = await faqService.downloadFaqList(lastSyncTime);

      // Assert
      expect(downloadedFaqList).to.be.an("array");
    });
  });
});
