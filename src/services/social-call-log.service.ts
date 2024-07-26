import { EntityRepository, Repository, getConnection } from "typeorm";
import { SocialCallLogDto } from "@dtos/social-call-log.dto";
import { SocialCallLogEntity } from "@entities/social-call-log.entity";
import { HttpException } from "@exceptions/HttpException";
import { SocialCallLog } from "@interfaces/social-call-log.interface";
import { getTgs } from "@/helpers/get_master_assignment";
import { getArrayString } from "@/helpers/array_sterilizer";

@EntityRepository()
class SocialCallLogService extends Repository<SocialCallLogEntity> {
  //sync up functionality
  public async updateSocialCallLogList(
    socialCallLogData: SocialCallLogDto[]
  ): Promise<SocialCallLog[]> {
    if (socialCallLogData.length === 0)
      throw new HttpException(400, "SocialCallLog data is empty");

    const updatedData = [];

    for (const item of socialCallLogData) {
      if (item.social_log_id) {
        const findExistingSocialCallLog: SocialCallLog =
          await SocialCallLogEntity.findOne({
            where: { social_log_id: item.social_log_id },
          });

        if (findExistingSocialCallLog) {
          await SocialCallLogEntity.update(
            findExistingSocialCallLog.social_log_id,
            { ...item }
          );
          updatedData.push({ social_log_id: item.social_log_id, status: 1 });
        } else {
          const createSocialCallLog: SocialCallLog =
            await SocialCallLogEntity.create({ ...item }).save();
          updatedData.push({
            social_log_id: createSocialCallLog.social_log_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadSocialCallLogList(
    last_sync_time: string,
    staff_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    const assignments = await getTgs(staff_id);
    const sterilizedTgs = getArrayString(assignments);
    const downloads = await getConnection().query(`
    SELECT * FROM social_call_log_entity WHERE ik_number IN (${sterilizedTgs}) AND updated_at >= TIMESTAMP'${lastDownloadTime}'
    `);
    return downloads;
  }
}

export default SocialCallLogService;
