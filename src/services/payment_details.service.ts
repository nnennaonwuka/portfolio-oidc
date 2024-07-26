import PaymentDetailsEntity from "@/entities/payment_details.entity";

import { HttpException } from "@/exceptions/HttpException";
import { PaymentDetails } from "@/interfaces/payment_details.interface";
import { isEmpty } from "class-validator";
import { EntityRepository, getConnection, Repository } from "typeorm";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class PaymentDetailsService extends Repository<PaymentDetailsEntity> {
  public async syncUpPaymentDetails(
    PaymentDetailsData: PaymentDetailsEntity[]
  ): Promise<Array<{}>> {
    if (isEmpty(PaymentDetailsData))
      throw new HttpException(400, "payment-details data is empty");

    const updatedData = await Promise.all(
      PaymentDetailsData.map(async (eachPaymentDetails) => {
        try {
          await PaymentDetailsEntity.save(eachPaymentDetails);
          return {
            tg_id: eachPaymentDetails.tg_id,
            date_logged: eachPaymentDetails.date_logged,
            status: 1,
          };
        } catch (error) {
          return {
            tg_id: eachPaymentDetails.tg_id,
            date_logged: eachPaymentDetails.date_logged,
            status: 0,
            message: error.message,
          };
        }
      })
    );
    return updatedData;
  }

  public async syncDownPaymentDetails(
    last_sync_time: string,
    entity_id: string
  ): Promise<PaymentDetails[]> {
    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.SHP_PC];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    const lastDownload = new Date(last_sync_time).toISOString();
    const downloadables = await getConnection().query(
      `SELECT * FROM "payment_details_entity" WHERE "updated_at">=TIMESTAMP'${lastDownload}' `
    );
    return downloadables;
  }
}

export default PaymentDetailsService;
