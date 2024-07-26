import PaymentDetailsEntity from "@/entities/payment_details.entity";
import { PaymentDetails } from "@/interfaces/payment_details.interface";
import PaymentDetailsService from "@/services/payment_details.service";
import { expect } from "chai";

describe("PaymentDetailsService", () => {
  let paymentDetailsService: PaymentDetailsService;

  before(() => {
    paymentDetailsService = new PaymentDetailsService();
  });

  describe("syncUpPaymentDetails", () => {
    // Successfully update payment details data
    it("should successfully update payment details data", async () => {
      // Arrange
      const paymentDetailsData: PaymentDetails[] = [
        {
          payment_details_id: "1",
          depositor_name: "John Doe",
          deposit_date: "2024-02-23",
          tg_id: "TG125",
          mode_of_payment: "Cash",
          amount: "100",
          latitude: "40.7128",
          longitude: "-74.0060",
          date_logged: "2024-02-23",
          bank_name: "ABC Bank",
          bank_community_id: "C123",
          bank_ward_id: "W123",
          transaction_charges: "5",
          transaction_receipt_id: "TR123",
          company_receipt_id: "CR123",
          payment_transaction_id: "PT123",
          staff_id: "S123",
          imei: "IMEI123",
          app_version: "1.0",
          sync_flag: 1,
          bank_lga_id: "LGA123",
          payment_status: "Paid",
          delete_status: 0,
          reason_for_deletion: "",
          delete_date: "",
          transaction_receipt_image: "receipt.jpg",
          pcs_logged_flag: 1,
          pcs_id: "PCS123",
        },
        {
          payment_details_id: "1",
          depositor_name: "John Doe",
          deposit_date: "2024-02-23",
          tg_id: "TG123",
          mode_of_payment: "Cash",
          amount: "100",
          latitude: "40.7128",
          longitude: "-74.0060",
          date_logged: "2024-02-23",
          bank_name: "ABC Bank",
          bank_community_id: "C123",
          bank_ward_id: "W123",
          transaction_charges: "5",
          transaction_receipt_id: "TR123",
          company_receipt_id: "CR123",
          payment_transaction_id: "PT123",
          staff_id: "S123",
          imei: "IMEI123",
          app_version: "1.0",
          sync_flag: 1,
          bank_lga_id: "LGA123",
          payment_status: "Paid",
          delete_status: 0,
          reason_for_deletion: "",
          delete_date: "",
          transaction_receipt_image: "receipt.jpg",
          pcs_logged_flag: 1,
          pcs_id: "PCS123",
        },
      ];

      // Act
      const updatedData = await paymentDetailsService.syncUpPaymentDetails(
        paymentDetailsData as PaymentDetailsEntity[]
      );

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(paymentDetailsData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("tg_id");
        expect(data).to.have.property("status").that.is.oneOf([0, 1]);
      });
    });
  });

  describe("syncDownPaymentDetails", () => {
    // Successfully download payment details data
    it("should successfully download payment details data", async () => {
      // Arrange
      const lastSyncTime = "0";
      const entityId = "6"; // Assuming this is the entity ID to test
      // Act
      const downloadables = await paymentDetailsService.syncDownPaymentDetails(
        lastSyncTime,
        entityId
      );

      // Assert
      expect(downloadables).to.be.an("array");
      // Add more assertions as needed
    });
  });
});
