import { EntityRepository, Repository} from "typeorm";
import { MeetingsEntity } from "@/entities/meetings.entity";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class MeetingsService extends Repository<MeetingsEntity> {
  //sync up functionality
  public async updateMeetingsList(MeetingsData: MeetingsEntity[]): Promise<Array<{}>> {

    const updatedData = await Promise.all(
        MeetingsData.map(async eachMeeting => {
          try {
            await MeetingsEntity.save(eachMeeting);
            return {
            meeting_id: eachMeeting.meeting_id,
            status: 1,
            message: 'Item was successfully saved/updated',
            };
          } catch (err) {
            return {
            meeting_id: eachMeeting.meeting_id,
            status: 0,
            message: err.message,
            };
          }
        }),
      );
    return updatedData;
  
  }

  //sync down functionality
  public async downloadMeetingsList(last_sync_time: string, staff_id: string, entity_id:string, hub_id: string ) {
    try{
        const lastDownloadTime = new Date(last_sync_time).toISOString();

        //Check if service can be accessed by entity id passed
        const entityGroups = [CONSTANTS.SHP_SUPERVISOR];

        const entityArr = await getEntityArray(entityGroups);

        if (entity_id && !entityArr.includes(entity_id.trim())) {
        return [];
        }

        const data = await MeetingsEntity.createQueryBuilder('table')
        .select()
        .where('table.updated_at >= :lastDownloadTime AND table.hub_id = :hub_id', { lastDownloadTime, hub_id })
        .getMany();
   
        return data;
    }
    catch (err) {
        throw err;
    }
  }

}

export default MeetingsService;
