import { EntityRepository, Repository, getConnection } from "typeorm";
import { ActivityLogDto } from "@dtos/activity-log.dto";
import { ActivityLogEntity } from "@entities/activity-log.entity";
import { HttpException } from "@exceptions/HttpException";
import { ActivityLog } from "@interfaces/activity-log.interface";
import { getTgs } from "@/helpers/get_master_assignment";
import { getArrayString } from "@/helpers/array_sterilizer";

@EntityRepository()
class ActivityLogService extends Repository<ActivityLogEntity> {
  //sync up functionality
  public async updateActivityLogList(
    ActivityLogData: ActivityLogDto[]
  ): Promise<ActivityLog[]> {
    if (ActivityLogData.length === 0)
      throw new HttpException(400, "ActivityLog data is empty");

    const updatedData = [];

    for (const item of ActivityLogData) {
      if (item.activity_log_id) {
        const findExistingActivityLog: ActivityLog =
          await ActivityLogEntity.findOne({
            where: { activity_log_id: item.activity_log_id },
          });

        if (findExistingActivityLog) {
          await ActivityLogEntity.update(
            findExistingActivityLog.activity_log_id,
            { ...item }
          );
          updatedData.push({
            activity_log_id: item.activity_log_id,
            status: 1,
          });
        } else {
          const createActivityLog: ActivityLog = await ActivityLogEntity.create(
            { ...item }
          ).save();
          updatedData.push({
            activity_log_id: createActivityLog.activity_log_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadActivityLogList(
    last_sync_time: string,
    staff_id: string,
    operator_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    if (operator_id) {
      const downloads = await getConnection().query(`
      SELECT * FROM activity_log_entity WHERE operator_id = '${operator_id}' AND updated_at >= TIMESTAMP'${lastDownloadTime}'
      `);
      return downloads;
    }
    const assignments = await getTgs(staff_id);
    const sterilizedTgs = getArrayString(assignments);

    const downloads = await getConnection().query(`
    SELECT * FROM activity_log_entity WHERE ik_number IN (${sterilizedTgs}) AND updated_at >= TIMESTAMP'${lastDownloadTime}'
    `);
    return downloads;
  }
}

export default ActivityLogService;
