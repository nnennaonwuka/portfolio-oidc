import { EntityRepository, Repository, getConnection } from "typeorm";
import { PaymentTrackerDto } from "@dtos/payment-tracker.dto";
import { PaymentTrackerEntity } from "@entities/payment-tracker.entity";
import { HttpException } from "@exceptions/HttpException";
import { PaymentTracker } from "@interfaces/payment-tracker.interface";
import { isEmpty } from "@utils/util";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class PaymentTrackerService extends Repository<PaymentTrackerEntity> {
  public async findAllPaymentTracker(): Promise<PaymentTracker[]> {
    const PaymentTrackers: PaymentTracker[] = await PaymentTrackerEntity.find();
    return PaymentTrackers;
  }

  public async findPaymentTrackerById(
    PaymentTrackerId: string
  ): Promise<PaymentTracker> {
    if (isEmpty(PaymentTrackerId))
      throw new HttpException(400, "You're not a PaymentTrackerId");

    const findPaymentTracker: PaymentTracker =
      await PaymentTrackerEntity.findOne({
        where: { tracker_id: PaymentTrackerId },
      });
    if (!findPaymentTracker)
      throw new HttpException(409, "You're not a PaymentTracker");

    return findPaymentTracker;
  }

  public async createPaymentTracker(
    PaymentTrackerData: PaymentTrackerDto
  ): Promise<PaymentTracker> {
    if (isEmpty(PaymentTrackerData))
      throw new HttpException(400, "You're not a PaymentTrackerData");

    const findPaymentTracker: PaymentTracker =
      await PaymentTrackerEntity.findOne({
        where: { tracker_id: PaymentTrackerData.tracker_id },
      });
    if (findPaymentTracker)
      throw new HttpException(
        409,
        `The id ${PaymentTrackerData.tracker_id} already exists`
      );

    const createPaymentTrackerData: PaymentTracker =
      await PaymentTrackerEntity.create({ ...PaymentTrackerData }).save();

    return createPaymentTrackerData;
  }

  public async updatePaymentTracker(
    PaymentTrackerId: string,
    PaymentTrackerData: PaymentTrackerDto
  ): Promise<PaymentTracker> {
    if (isEmpty(PaymentTrackerData))
      throw new HttpException(400, "You're not PaymentTrackerData");

    const findPaymentTracker: PaymentTracker =
      await PaymentTrackerEntity.findOne({
        where: { tracker_id: PaymentTrackerId },
      });
    if (!findPaymentTracker)
      throw new HttpException(409, "You're not PaymentTracker");

    await PaymentTrackerEntity.update(PaymentTrackerId, {
      ...PaymentTrackerData,
    });

    const updatePaymentTracker: PaymentTracker =
      await PaymentTrackerEntity.findOne({
        where: { tracker_id: PaymentTrackerId },
      });
    return updatePaymentTracker;
  }

  public async deletePaymentTracker(
    PaymentTrackerId: string
  ): Promise<PaymentTracker> {
    if (isEmpty(PaymentTrackerId))
      throw new HttpException(400, "You're not PaymentTrackerId");

    const findPaymentTracker: PaymentTracker =
      await PaymentTrackerEntity.findOne({
        where: { tracker_id: PaymentTrackerId },
      });
    if (!findPaymentTracker)
      throw new HttpException(409, "You're not PaymentTracker");

    await PaymentTrackerEntity.delete({ tracker_id: PaymentTrackerId });
    return findPaymentTracker;
  }

  //sync up functionality
  public async updatePaymentTrackerList(
    PaymentTrackerData: PaymentTrackerDto[]
  ): Promise<PaymentTracker[]> {
    if (PaymentTrackerData.length === 0)
      throw new HttpException(400, "PaymentTracker data is empty");

    const updatedData = [];

    for (const item of PaymentTrackerData) {
      if (item.tracker_id) {
        const findExistingPaymentTracker: PaymentTracker =
          await PaymentTrackerEntity.findOne({
            where: { tracker_id: item.tracker_id },
          });

        if (findExistingPaymentTracker) {
          await PaymentTrackerEntity.update(
            findExistingPaymentTracker.tracker_id,
            { ...item }
          );
          updatedData.push({
            tracker_id: item.tracker_id,
            status: 1,
          });
        } else {
          const createPaymentTracker: PaymentTracker =
            await PaymentTrackerEntity.create({ ...item }).save();
          updatedData.push({
            tracker_id: createPaymentTracker.tracker_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadPaymentTrackerList(
    last_sync_time: string,
    staff_id: string,
    entity_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.SHP_PC];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    // Fetch data from the table
    const downloadables = await getConnection().query(
      `SELECT * FROM "payment_tracker_entity" WHERE "staff_id" = '${staff_id}' AND "updated_at">=TIMESTAMP'${lastDownloadTime}' `
    );
    return downloadables;
  }
}

export default PaymentTrackerService;
