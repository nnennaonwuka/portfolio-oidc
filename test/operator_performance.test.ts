import { expect } from "chai";
import MeetingsService from "@/services/meetings.service";
import { MeetingsEntity } from "@/entities/meetings.entity";
import { Meetings } from "@/interfaces/meetings.interface";
import MeetingAttendeesService from "@/services/meeting_attendees.service";
import { MeetingAttendeesEntity } from "@/entities/meeting_attendees.entity";
import { MeetingAttendees } from "@/interfaces/meeting_attendees.interface";
import OperatorPerformanceService from "@/services/operator_performance.service";
import { OperatorPerformanceEntity } from "@/entities/operator_performance.entity";
import { OperatorPerformance } from "@/interfaces/operator_performance.interface";


describe("OperatorPerformanceService", () => {
  let operatorPerformanceService: OperatorPerformanceService;

  before(() => {
    operatorPerformanceService = new OperatorPerformanceService();
  });

  after(async () => {
    // Clean up after tests if needed
    await OperatorPerformanceEntity.clear();
  });

  describe("Sync up", () => {
    it("should successfully add/ update data on operator performance table", async () => {
      // Arrange
      const operators: OperatorPerformance[]= [
        {
            operator_id: "O001",
            staff_id: "S2001",
            first_name: "Amaka",
            last_name: "Eze",
            least_performing_activity: "Data Entry",
            percentage: "45%",
            hub_id: "H1001"
        },
        {
            operator_id: "O002",
            staff_id: "S2002",
            first_name: "Kunle",
            last_name: "Ogunleye",
            least_performing_activity: "Customer Support",
            percentage: "50%",
            hub_id: "H1002"
        }
    ];
    
    

      // Act
      const updatedData = await operatorPerformanceService.updateOperatorPerformanceList(operators as OperatorPerformanceEntity[]);

      // Assert
      expect(updatedData).to.be.an("array");
      updatedData.forEach((update) => {
        expect(update).to.have.property("operator_id");
        expect(update).to.have.property("status", 1); // Assuming status 1 means success
      });
    });
  });

  describe("Sync down", () => {
    it("should successfully download operator performance table", async () => {
      // Arrange
      const lastSyncTime = "2023-01-01";
      const hub_id = "2";
      const entity_id = "1";

      // Act
      const downloads =
        await operatorPerformanceService.downloadOperatorPerformanceList(
          lastSyncTime,
          hub_id,
          entity_id
        );

      // Assert
      expect(downloads).to.be.an("array");
    });
  });
});
