import { DefaultingTgDto } from "@/dtos/defaultingTg.dto";
import { DefaultingTgEntity } from "@/entities/defaulting-tg.entity";
import { PortfolioManagementAssignmentEntity } from "@/entities/porfolio-management.entity";
import { PortfolioManagement } from "@/interfaces/portfolio-management.interface";
import DefaultingTgService from "@/services/defaulting-tg.service";
import { expect } from "chai";

describe("DefaultingTgService", () => {
  let defaultingTgService: DefaultingTgService;

  before(() => {
    defaultingTgService = new DefaultingTgService();
  });

  after(async () => {
    // Clean up after tests if needed
    await DefaultingTgEntity.clear();
    await PortfolioManagementAssignmentEntity.clear();
  });

  describe("findAllDefaultingTg", () => {
    it("should return an array of defaulting TGs", async () => {
      // Act
      const result = await defaultingTgService.findAllDefaultingTg();

      // Assert
      expect(result).to.be.an("array");
    });
  });

  

  describe("createDefaultingTg", () => {
    it("should create a new defaulting TG", async () => {
      // Arrange
      const testData: DefaultingTgDto = {
        tg_id: "new_id",
        opening_balance: "1000",
        program: "Test Program",
        staff_id: "staff123",
        hub_id: "Test Hub",
        defaulting_year: "2023",
        risk_level: "High",
        nature: "Test Nature",
      };

      // Act
      const result = await defaultingTgService.createDefaultingTg(testData as DefaultingTgDto);

      // Assert
      expect(result).to.be.an("object");
      expect(result.tg_id).to.equal(testData.tg_id);
    });
  });

  describe("updateDefaultingTg", () => {
    it("should update the defaulting TG with the specified ID", async () => {
      // Arrange
      const tgId = "new_id";
      const updatedData  = {
        opening_balance: "2000",
        program: "Updated Program",
        // Add other fields to update as needed
      };

      // Act
      const result = await defaultingTgService.updateDefaultingTg(tgId, updatedData as DefaultingTgDto);

      // Assert
      expect(result).to.be.an("object");
      expect(result.tg_id).to.equal(tgId);
      expect(result.opening_balance).to.equal(updatedData.opening_balance);
      expect(result.program).to.equal(updatedData.program);
      // Add more assertions for other fields
    });
  });

  describe("findDefaultingTgById", () => {
    it("should return the defaulting TG with the specified ID", async () => {
      // Arrange
      const tgId = "new_id";

      // Act
      const result = await defaultingTgService.findDefaultingTgById(tgId);

      // Assert
      expect(result).to.be.an("object");
      expect(result.tg_id).to.equal(tgId);
    });
  });

  describe("deleteDefaultingTg", () => {
    it("should delete the defaulting TG with the specified ID", async () => {
      // Arrange
      const tgId = "new_id";

      // Act
      const result = await defaultingTgService.deleteDefaultingTg(tgId);

      // Assert
      expect(result).to.be.an("object");
      expect(result.tg_id).to.equal(tgId);
    });
  });

  describe("updateDefaultingTgList", () => {
    it("should update the list of defaulting TGs", async () => {
      // Arrange
      const testData : DefaultingTgDto[] = [
        {
          tg_id: "tg1",
          opening_balance: "2000",
          program: "Updated Program",
          staff_id: "staff123",
          hub_id: "3",
          defaulting_year: "2023",
          risk_level: "High",
          nature: "Updated Nature",
        },
        {
          tg_id: "tg2",
          opening_balance: "1500",
          program: "Test Program",
          staff_id: "staff456",
          hub_id: "4",
          defaulting_year: "2023",
          risk_level: "Medium",
          nature: "Test Nature",
        },
      ];

      // Act
      const result = await defaultingTgService.updateDefaultingTgList(testData);

      // Assert
      expect(result).to.be.an("array");
      expect(result).to.have.lengthOf(testData.length);
      result.forEach((data) => {
        expect(data).to.have.property("tg_id");
        expect(data).to.have.property("status", 1);

      })
    });

  });

  describe("uploadPortfolioManagement", () => {
    it("should upload portfolio management data", async () => {
      // Arrange
      const testData : PortfolioManagement[] = [
        {
            ik_number: "IK123",
            hub: "Hub A",
            hub_classification: "Class A",
            program: "Program X",
            pco: "PCO1",
            pcs: "PCS1",
            mik: "MIK1",
            mik_seed: "MIK Seed 1",
            lmik: "LMIK1",
            lmik_seed: "LMIK Seed 1",
            msb: "MSB1",
            bgt: "BGT1",
            bgt_seed: "BGT Seed 1",
        },
        {
            ik_number: "IK456",
            hub: "Hub B",
            hub_classification: "Class B",
            program: "Program Y",
            pco: "PCO2",
            pcs: "PCS2",
            mik: "MIK2",
            mik_seed: "MIK Seed 2",
            lmik: "LMIK2",
            lmik_seed: "LMIK Seed 2",
            msb: "MSB2",
            bgt: "BGT2",
            bgt_seed: "BGT Seed 2", 
        },
      ];

      // Act
      const result = await defaultingTgService.uploadPortfolioManagement(testData as PortfolioManagementAssignmentEntity[]);

      // Assert
      expect(result).to.be.an("array");
      expect(result).to.have.lengthOf(testData.length);
      result.forEach((data) => {
        expect(data).to.have.property("ik_number");
        expect(data).to.have.property("status", 1);
      })
    });
  });

  describe("downloadDefaultingTgList", () => {
    it("should download the list of defaulting TGs", async () => {
      // Arrange
      const lastSyncTime = "2024-02-28T00:00:00.000Z";
      const staffId = "staff123";
      const entityId = "12";

      // Act
      const result = await defaultingTgService.downloadDefaultingTgList(lastSyncTime, staffId, entityId);

      // Assert
      expect(result).to.be.an("array");
      // Add more assertions based on the expected structure of the downloaded data
    });
  });

  describe("downloadTgList", () => {
    it("should download the list of TGs", async () => {
      // Arrange
      const staffId = "staff123";
      const entityId = "entity123";

      // Act
      const result = await defaultingTgService.downloadTgList(staffId, entityId);

      // Assert
      expect(result).to.be.an("array");
    });
  });
});
