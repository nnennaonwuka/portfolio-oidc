import { expect } from "chai";
import { FaqConfigEntity } from "@/entities/faq-config.entity";
import FaqConfigService from "@/services/faq-config.service";
import { FaqConfig } from "@/interfaces/faq-config.interface";

describe("FaqConfigService", () => {
  let faqConfigService: FaqConfigService;

  before(() => {
    faqConfigService = new FaqConfigService();
  });

  after(async () => {
    // Clean up after tests if needed
    await FaqConfigEntity.clear();
  });

  describe("findAllFaqConfig", () => {
    it("should return an array of FAQ config", async () => {
      // Act
      const result = await faqConfigService.findAllFaqConfig();

      // Assert
      expect(result).to.be.an("array");
    });
  });

  describe("updateFaqConfigList", () => {
    it("should successfully update FAQ config list", async () => {
      // Arrange
      const faqConfigData : FaqConfig[] = [
        {
          faq_config_id: "1",
          name: "FAQ 1",
          description: "Description of FAQ 1",
        },
        // Add more test data as needed
      ];

      // Act
      const updatedData = await faqConfigService.updateFaqConfigList(faqConfigData);

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(faqConfigData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("faq_config_id");
        expect(data).to.have.property("status", 1);
      });
    });
  });

  describe("downloadFaqConfigList", () => {
    it("should successfully download FAQ config list based on last_sync_time", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";

      // Act
      const result = await faqConfigService.downloadFaqConfigList(lastSyncTime);

      // Assert
      expect(result).to.be.an("array");
    });
  });

  describe("createFaqConfig", () => {
    it("should successfully create a new FAQ config", async () => {
      // Arrange
      const faqConfigData = {
        faq_config_id: "2",
        name: "FAQ 1",
        description: "Description of FAQ 1",
      };

      // Act
      const createdFaqConfig = await faqConfigService.createFaqConfig(faqConfigData);

      // Assert
      expect(createdFaqConfig).to.be.an("object");
      expect(createdFaqConfig).to.have.property("faq_config_id", faqConfigData.faq_config_id);
    });
  });


  describe("findFaqConfigById", () => {
    it("should return a single FAQ config", async () => {
      // Arrange
      const faqConfigId = "1";

      // Act
      const result = await faqConfigService.findFaqConfigById(faqConfigId);

      // Assert
      expect(result).to.be.an("object");
    })
  })

  describe("updateFaqConfig", () => {
    it("should successfully update an existing FAQ config", async () => {
      // Arrange
      const faqConfigData = {
        faq_config_id: "1",
        name: "Updated FAQ 1",
        description: "Updated description of FAQ 1",
      };

      // Act
      const updatedFaqConfig = await faqConfigService.updateFaqConfig(faqConfigData.faq_config_id, faqConfigData);

      // Assert
      expect(updatedFaqConfig).to.be.an("object");
      expect(updatedFaqConfig).to.have.property("faq_config_id", faqConfigData.faq_config_id);
      expect(updatedFaqConfig).to.have.property("name", faqConfigData.name);
      expect(updatedFaqConfig).to.have.property("description", faqConfigData.description);
    });
  });

  describe("deleteFaqConfig", () => {
    it("should successfully delete an existing FAQ config", async () => {
      // Arrange
      const faqConfigData = {
        faq_config_id: "1",
      }

      // Act
      const deletedFaqConfig = await faqConfigService.deleteFaqConfig(faqConfigData.faq_config_id);

      // Assert
      expect(deletedFaqConfig).to.be.an("object");
      expect(deletedFaqConfig).to.have.property("faq_config_id", faqConfigData.faq_config_id);
    });
  });
});
