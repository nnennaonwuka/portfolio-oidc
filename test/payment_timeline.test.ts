import PaymentTimelineEntity from "@/entities/payment-timeline.entity";
import { PaymentTimeline } from "@/interfaces/payment-timeline.interface";
import PaymentTimelineService from "@/services/payment-timeline.service";
import { expect } from "chai";

describe("PaymentTimelineService", () => {
  let paymentTimelineService: PaymentTimelineService;

  before(() => {
    paymentTimelineService = new PaymentTimelineService();
  });

  describe("findAllPaymentTimelines", () => {
    it("should find all payment timelines", async () => {
      // Arrange

      // Act
      const foundPaymentTimelines =
        await paymentTimelineService.findAllPaymentTimelines();
      // Assert
      expect(foundPaymentTimelines).to.be.an("array");
    });
  });

  describe("syncUpPaymentTimelines", () => {
    it("should sync up payment timelines", async () => {
      // Arrange
      const mockPaymentTimelinesData: PaymentTimeline[] = [
        {
          tg_id: "1",
          date_logged: "2024-02-25",
          reference_id: "ref1",
          delivery_flag: 1,
          payment_flag: 0,
          debt_flag: 0,
          plan_flag: 1,
          frequency: "monthly",
          frequency_count: "1",
          minimum_amount: "100",
          completion_date: "2024-03-25",
          next_date: "2024-03-01",
          next_amount: "120",
          staff_id: "staff1",
          imei: "imei1",
          app_version: "1.0",
        },
        {
          tg_id: "2",
          date_logged: "2024-02-26",
          reference_id: "ref2",
          delivery_flag: 0,
          payment_flag: 1,
          debt_flag: 1,
          plan_flag: 0,
          frequency: "weekly",
          frequency_count: "2",
          minimum_amount: "50",
          completion_date: "2024-03-10",
          next_date: "2024-03-05",
          next_amount: "60",
          staff_id: "staff2",
          imei: "imei2",
          app_version: "2.0",
        },
      ];
      // Act
      const updatedData = await paymentTimelineService.syncUpPaymentTimelines(
        mockPaymentTimelinesData as PaymentTimelineEntity[]
      );
      // Assert
      expect(updatedData).to.be.an("array");
      expect(updatedData).to.have.lengthOf(mockPaymentTimelinesData.length);
      updatedData.forEach((data) => {
        expect(data).to.have.property("tg_id");
        expect(data).to.have.property("status");
      });
      // Add more assertions as needed
    });
  });

  describe("syncDownPaymentTimelines", () => {
    it("should sync down payment timelines", async () => {
      // Arrange
      const mockLastSyncTime = "2024-02-25T00:00:00.000Z";
      const mockEntityId = "example_entity_id";
      // Act
      const downloadable =
        await paymentTimelineService.syncDownPaymentTimelines(
          mockLastSyncTime,
          mockEntityId
        );
      // Assert
      expect(downloadable).to.be.an("array");
      // Add more assertions as needed
    });
  });
});
