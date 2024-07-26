import DefaultRfLogEntity from "@/entities/default-rf-log.entity";
import { HttpException } from "@/exceptions/HttpException";
import { DefaultRfLog } from "@/interfaces/deafualt_rf_log.interface";
import { isEmpty } from "class-validator";
import { EntityRepository, getConnection, Repository } from "typeorm";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class DefaultRfLogService extends Repository<DefaultRfLogEntity> {
  public async findAllDefaultRfLogs(): Promise<DefaultRfLog[]> {
    const DefaultRfLogs: DefaultRfLog[] = await DefaultRfLogEntity.find();
    return DefaultRfLogs;
  }

  public async syncUpDefaultRfLogs(
    DefaultRfLogsData: DefaultRfLogEntity[]
  ): Promise<Array<{}>> {
    if (isEmpty(DefaultRfLogsData))
      throw new HttpException(400, "default-rf-log data is empty");

    const updatedData = await Promise.all(
      DefaultRfLogsData.map(async (eachDefaultRfLog) => {
        try {
          await DefaultRfLogEntity.save(eachDefaultRfLog);
          return {
            tg_id: eachDefaultRfLog.tg_id,
            rf_type: eachDefaultRfLog.rf_type,
            date_logged: eachDefaultRfLog.date_logged,
            status: 1,
          };
        } catch (error) {
          return {
            tg_id: eachDefaultRfLog.tg_id,
            rf_type: eachDefaultRfLog.rf_type,
            date_logged: eachDefaultRfLog.date_logged,
            status: 0,
            message: error.message,
          };
        }
      })
    );
    return updatedData;
  }

  public async syncDownDefaultRfLogs(
    last_sync_time: string,
    entity_id: string
  ): Promise<DefaultRfLog[]> {
    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.PC];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    const lastDownload = new Date(last_sync_time).toISOString();
    const downloadables = await getConnection().query(
      `SELECT * FROM "default_rf_log_entity" WHERE "updated_at">=TIMESTAMP'${lastDownload}' `
    );
    return downloadables;
  }
}

export default DefaultRfLogService;
