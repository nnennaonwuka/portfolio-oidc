import SelfDepositDetailsEntity from "@/entities/self-deposit-details.entity";
import { PAYMENT_STATUS } from "@/enums/payment-status.enum";
import { HttpException } from "@/exceptions/HttpException";
import { SelfDepositDetails } from "@/interfaces/self-deposit-details.interface";
import { isEmpty } from "class-validator";
import { EntityRepository, getConnection, Repository } from "typeorm";
import DefaultingTgService from "./defaulting-tg.service";
import {
  GCS_PROJECT_ID,
  GCS_PRIVATE_KEY,
  GCS_CLIENT_EMAIL,
  GCS_BUCKET,
  GCS_PICTURES_PATH,
} from "@config";
import { Storage } from "@google-cloud/storage";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";
@EntityRepository()
class SelfDepositDetailsService extends Repository<SelfDepositDetailsEntity> {
  private readonly defaultingTgService = new DefaultingTgService();
  storage = new Storage({
    projectId: GCS_PROJECT_ID,
    credentials: {
      client_email: GCS_CLIENT_EMAIL,
      private_key: GCS_PRIVATE_KEY,
    },
  });
  bucket = this.storage.bucket(GCS_BUCKET);

  public async findAllSelfDepositDetails(): Promise<SelfDepositDetails[]> {
    const baseURL = `https://storage.googleapis.com/${this.bucket.name}/`;
    const SelfDepositDetails: SelfDepositDetails[] =
      await SelfDepositDetailsEntity.find();
    for (const item of SelfDepositDetails) {
      item.receipt_url =
        baseURL + GCS_PICTURES_PATH + `receipt_${item.receipt_id}.jpg`;
    }
    return SelfDepositDetails;
  }

  public async syncUpSelfDepositDetails(
    SelfDepositDetailsData: SelfDepositDetailsEntity[]
  ): Promise<Array<{}>> {
    if (isEmpty(SelfDepositDetailsData))
      throw new HttpException(400, "self-deposit-details data is empty");

    const updatedData = await Promise.all(
      SelfDepositDetailsData.map(async (eachSelfDepositDetails) => {
        try {
          await SelfDepositDetailsEntity.save(eachSelfDepositDetails);
          return {
            tg_id: eachSelfDepositDetails.tg_id,
            date_logged: eachSelfDepositDetails.date_logged,
            status: 1,
          };
        } catch (error) {
          return {
            tg_id: eachSelfDepositDetails.tg_id,
            date_logged: eachSelfDepositDetails.date_logged,
            status: 0,
            message: error.message,
          };
        }
      })
    );
    return updatedData;
  }

  public getArrayString = (arr) => {
    const arr_string = arr.join("','");
    return `'${arr_string}'`;
  };

  public async syncDownSelfDepositDetails(
    last_sync_time: string,
    staff_id: string,
    entity_id: string
  ): Promise<SelfDepositDetails[]> {
    const lastDownload = new Date(last_sync_time).toISOString();

    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.SHP];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    const assignedTgs = this.getArrayString(
      await this.defaultingTgService.downloadTgList(staff_id, entity_id)
    );

    const downloadables = await getConnection().query(
      `SELECT * FROM "self_deposit_details_entity" WHERE "tg_id" IN (${assignedTgs}) AND "updated_at">=TIMESTAMP'${lastDownload}' `
    );
    return downloadables;
  }

  public async getSelfDepositDetailsById(tg_id: string, date_logged: string) {
    const baseURL = `https://storage.googleapis.com/${this.bucket.name}/`;
    const selfDepositDetails = await SelfDepositDetailsEntity.findOne({
      where: { tg_id, date_logged },
    });
    if (!selfDepositDetails)
      throw new HttpException(404, "self deposit details not found");
    selfDepositDetails.receipt_url =
      baseURL +
      GCS_PICTURES_PATH +
      `receipt_${selfDepositDetails.receipt_id}.jpg`;
    return selfDepositDetails;
  }
  public async updateSelfDepositDetails(
    tg_id: string,
    date_logged: string,
    payment_status: string,
    comment: string
  ) {
    const selfDepositDetails = await SelfDepositDetailsEntity.findOne({
      where: { tg_id, date_logged },
    });
    if (!selfDepositDetails)
      throw new HttpException(404, "self deposit details not found");

    if (payment_status.toUpperCase() === PAYMENT_STATUS.APPROVED) {
      selfDepositDetails.payment_status = PAYMENT_STATUS.APPROVED;
      await selfDepositDetails.save();
      return selfDepositDetails;
    } else if (payment_status.toUpperCase() === PAYMENT_STATUS.DECLINED) {
      if (!comment)
        throw new HttpException(
          401,
          "Provide a reason for declining this transaction"
        );
      selfDepositDetails.payment_status = PAYMENT_STATUS.DECLINED;
      selfDepositDetails.comment = comment;
      await selfDepositDetails.save();
      return selfDepositDetails;
    } else {
      return selfDepositDetails;
    }
  }
}

export default SelfDepositDetailsService;
