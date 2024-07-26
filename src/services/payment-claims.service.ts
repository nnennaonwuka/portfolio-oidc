import { EntityRepository, getConnection, Repository } from "typeorm";
import { PaymentClaimsEntity } from "@/entities/payment-claims.entity";
import { HttpException } from "@exceptions/HttpException";
import { PaymentClaimsInterface } from "@/interfaces/payment-claims.interface";
import { PaymentClaimsDto } from "@/dtos/payment_claims.dto";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class PaymentClaimsService extends Repository<PaymentClaimsEntity> {
  public async findAllPaymentClaimss(): Promise<PaymentClaimsInterface[]> {
    const PaymentClaimss: PaymentClaimsInterface[] =
      await PaymentClaimsEntity.find();
    return PaymentClaimss;
  }

  // The logic to sync up PFM field survey data
  public async updatePaymentClaimsList(
    PaymentClaimss: PaymentClaimsDto[]
  ): Promise<PaymentClaimsInterface[]> {
    if (PaymentClaimss.length === 0)
      throw new HttpException(400, "Payment claims data is empty");

    const updatedData = [];

    for (const item of PaymentClaimss) {
      if (item.payment_claim_id) {
        const findExistingPaymentClaims: PaymentClaimsInterface =
          await PaymentClaimsEntity.findOne({
            where: { payment_claim_id: item.payment_claim_id },
          });

        if (findExistingPaymentClaims) {
          await PaymentClaimsEntity.update(
            findExistingPaymentClaims.payment_claim_id,
            {
              ...item,
            }
          );
          updatedData.push({
            payment_claim_id: item.payment_claim_id,
            status: 1,
          });
        } else {
          const createPaymentClaims: PaymentClaimsInterface =
            await PaymentClaimsEntity.create({ ...item }).save();
          updatedData.push({
            payment_claim_id: createPaymentClaims.payment_claim_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadPaymentClaimsList(
    last_sync_time: string,
    entity_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.SHP];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    // Fetch data from the table
    const downloadables = await getConnection().query(
      `SELECT * FROM "payment_claims_entity" WHERE  "updated_at">=TIMESTAMP'${lastDownloadTime}' `
    );
    return downloadables;
  }
}

export default PaymentClaimsService;
