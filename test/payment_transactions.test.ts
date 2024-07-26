import { PaymentTransactionsEntity } from "@/entities/payment-transactions.entity";
import { PaymentTransactions } from "@/interfaces/payment-transactions.interface";

import PaymentTransactionservice from "@/services/payment-transactions.service";
import { expect } from "chai";

describe("PaymentTransactionservice", () => {
  let paymentTransactionsService: PaymentTransactionservice;

  before(() => {
    paymentTransactionsService = new PaymentTransactionservice();
  });

  after(() => {
    PaymentTransactionsEntity.clear();
  });

  describe("findAllPaymentTransactions", () => {
    it("should find all payment transactions", async () => {
      // Act
      const foundPaymentTransactions =
        await paymentTransactionsService.findAllPaymentTransactions();
      // Assert
      expect(foundPaymentTransactions).to.be.an("array");
    });
  });

  describe("updatePaymentTransactionsList", () => {
    it("should update payment transactions list", async () => {
      // Arrange
      const mockPaymentTransactionsData: PaymentTransactions[] = [
        {
          payment_transaction_id: "1",
          receipt_id: "receipt_1",
          tracker_id: "tracker_1",
          tg_id: "tg_1",
          amount: "100",
          receiver_name: "Receiver 1",
          payment_method: "Method 1",
          comment: "Comment 1",
          member_verified_flag: 1,
          staff_id: "staff_1",
          app_version: "1.0.0",
          imei: "imei_1",
          date: "2024-02-29",
          corrected_balance: "200",
          balance_error_flag: 0,
          phone_number: "1234567890",
          cash_deposit_flag: 1,
          in_community_flag: 1,
          latitude: "40.7128",
          longitude: "-74.0060",
          pcs_logged_flag: 1,
          pcs_id: "pcs_1",
        },
        {
          payment_transaction_id: "2",
          receipt_id: "receipt_2",
          tracker_id: "tracker_2",
          tg_id: "tg_2",
          amount: "150",
          receiver_name: "Receiver 2",
          payment_method: "Method 2",
          comment: "Comment 2",
          member_verified_flag: 0,
          staff_id: "staff_2",
          app_version: "1.1.0",
          imei: "imei_2",
          date: "2024-03-01",
          corrected_balance: "250",
          balance_error_flag: 1,
          phone_number: "9876543210",
          cash_deposit_flag: 0,
          in_community_flag: 0,
          latitude: "34.0522",
          longitude: "-118.2437",
          pcs_logged_flag: 0,
          pcs_id: "pcs_2",
        },
      ];

      // Act
      const updatedData =
        await paymentTransactionsService.updatePaymentTransactionsList(
          mockPaymentTransactionsData as PaymentTransactions[]
        );

      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(mockPaymentTransactionsData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("payment_transaction_id");
        expect(data).to.have.property("status", 1);
      });
    });
  });

  describe("downloadPaymentTransactionsList", () => {
    it("should download payment transactions list", async () => {
      // Arrange
      const mockLastSyncTime = "2024-02-25T00:00:00.000Z";
      const mockEntityId = "example_entity_id";

      // Act
      const downloadable =
        await paymentTransactionsService.downloadPaymentTransactionsList(
          mockLastSyncTime,
          mockEntityId
        );

      // Assert
      expect(downloadable).to.be.an("array");
      // Add more assertions as needed
    });
  });
});
