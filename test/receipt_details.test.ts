import { ReceiptDetailsDto } from "@/dtos/receipt_details.dto";
import ReceiptDetailsService from "@/services/receipt_details.service";
import { expect } from "chai";

describe("ReceiptDetailsService", () => {
  let receiptDetailsService: ReceiptDetailsService;

  before(() => {
    receiptDetailsService = new ReceiptDetailsService();
  });

  describe("findAllReceiptDetailss", () => {
    // Successfully retrieve all receipt details
    it("should successfully retrieve all receipt details", async () => {
      // Act
      const receiptDetails =
        await receiptDetailsService.findAllReceiptDetailss();
      // Assert
      expect(receiptDetails).to.be.an("array");
      // Add more specific assertions if needed
    });
  });

  describe("updateReceiptDetailsList", () => {
    // Successfully update receipt details data
    it("should successfully update receipt details data", async () => {
      // Arrange
      const receiptDetailsData: ReceiptDetailsDto[] = [
        {
          receipt_id: "1",
          depositor_name: "John Doe",
          ik_number: "IK123456",
          date: new Date("2024-02-27"),
          amount_paid: "100",
          operator_id: "OP123",
          bank_name: "ABC Bank",
          phone_number: "1234567890",
          status: 1,
        },
        {
          receipt_id: "2",
          depositor_name: "Jane Smith",
          ik_number: "IK654321",
          date: new Date("2024-02-26"),
          amount_paid: "200",
          operator_id: "OP456",
          bank_name: "XYZ Bank",
          phone_number: "9876543210",
          status: 1,
        },
      ];

      // Act
      const updatedData = await receiptDetailsService.updateReceiptDetailsList(
        receiptDetailsData
      );

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(receiptDetailsData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("receipt_id");
        expect(data).to.have.property("status");
      });
      // Add more specific assertions if needed
    });
  });

  describe("downloadReceiptDetailsList", () => {
    // Successfully download receipt details data
    it("should successfully download receipt details data", async () => {
      // Arrange
      const lastSyncTime = "0";
      const entityId = "some_entity_id"; // Provide a valid entity ID if needed

      // Act
      const downloadables =
        await receiptDetailsService.downloadReceiptDetailsList(
          lastSyncTime,
          entityId
        );

      // Assert
      expect(downloadables).to.be.an("array");
      // Add more specific assertions if needed
    });
  });
});
