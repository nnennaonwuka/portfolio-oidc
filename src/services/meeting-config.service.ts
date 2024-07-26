import { EntityRepository, Repository } from "typeorm";
import { MeetingConfigDto } from "@dtos/meeting-config.dto";
import { MeetingConfigEntity } from "@entities/meeting-config.entity";
import { HttpException } from "@exceptions/HttpException";
import { MeetingConfig } from "@interfaces/meeting-config.interface";
import { isEmpty } from "@utils/util";

@EntityRepository()
class MeetingConfigService extends Repository<MeetingConfigEntity> {
  //sync up functionality
  public async updateMeetingConfigList(
    MeetingConfigData: MeetingConfigDto[]
  ): Promise<MeetingConfig[]> {
    if (MeetingConfigData.length === 0)
      throw new HttpException(400, "MeetingConfig data is empty");

    const updatedData = [];

    for (const item of MeetingConfigData) {
      if (item.meeting_config_id) {
        const findExistingMeetingConfig: MeetingConfig =
          await MeetingConfigEntity.findOne({
            where: { meeting_config_id: item.meeting_config_id },
          });

        if (findExistingMeetingConfig) {
          await MeetingConfigEntity.update(
            findExistingMeetingConfig.meeting_config_id,
            { ...item }
          );
          updatedData.push({
            meeting_config_id: item.meeting_config_id,
            status: 1,
          });
        } else {
          const createMeetingConfig: MeetingConfig =
            await MeetingConfigEntity.create({ ...item }).save();
          updatedData.push({
            meeting_config_id: createMeetingConfig.meeting_config_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadMeetingConfigList(last_sync_time: string) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    // Fetch data from the table
    const meetingConfigList = await MeetingConfigEntity.createQueryBuilder(
      "table"
    )
      .select()
      .where("table.updated_at >= :lastDownloadTime", { lastDownloadTime })
      .getMany();

    return meetingConfigList;
  }
}

export default MeetingConfigService;
