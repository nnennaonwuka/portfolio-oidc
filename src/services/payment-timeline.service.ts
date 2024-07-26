import PaymentTimelineEntity from "@/entities/payment-timeline.entity";
import { HttpException } from "@/exceptions/HttpException";
import { PaymentTimeline } from "@/interfaces/payment-timeline.interface";
import { isEmpty } from "class-validator";
import { EntityRepository, getConnection, Repository } from "typeorm";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class PaymentTimelineService extends Repository<PaymentTimelineEntity> {
  public async findAllPaymentTimelines(): Promise<PaymentTimeline[]> {
    const PaymentTimelines: PaymentTimeline[] =
      await PaymentTimelineEntity.find();
    return PaymentTimelines;
  }

  public async syncUpPaymentTimelines(
    PaymentTimelinesData: PaymentTimelineEntity[]
  ): Promise<Array<{}>> {
    if (isEmpty(PaymentTimelinesData))
      throw new HttpException(400, "Payment-timeline data is empty");

    const updatedData = await Promise.all(
      PaymentTimelinesData.map(async (eachPaymentTimeline) => {
        try {
          await PaymentTimelineEntity.save(eachPaymentTimeline);
          return {
            tg_id: eachPaymentTimeline.tg_id,
            date_logged: eachPaymentTimeline.date_logged,
            status: 1,
          };
        } catch (error) {
          return {
            tg_id: eachPaymentTimeline.tg_id,
            date_logged: eachPaymentTimeline.date_logged,
            status: 0,
            message: error.message,
          };
        }
      })
    );
    return updatedData;
  }

  public async syncDownPaymentTimelines(
    last_sync_time: string,
    entity_id: string
  ): Promise<PaymentTimeline[]> {
    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.SHP_PC];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    const lastDownload = new Date(last_sync_time).toISOString();
    const downloadable = await getConnection().query(
      `SELECT * FROM "payment_timeline_entity" WHERE "updated_at">=TIMESTAMP'${lastDownload}' `
    );
    return downloadable;
  }
}

export default PaymentTimelineService;
