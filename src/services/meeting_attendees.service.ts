import { EntityRepository, Repository} from "typeorm";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";
import { MeetingAttendeesEntity } from "@/entities/meeting_attendees.entity";

@EntityRepository()
class MeetingAttendeesService extends Repository<MeetingAttendeesEntity> {
  //sync up functionality
  public async updateMeetingAtendeesist(MeetingAtendeesData: MeetingAttendeesEntity[]): Promise<Array<{}>> {

    const updatedData = await Promise.all(
        MeetingAtendeesData.map(async eachattendee => {
          try {
                await MeetingAttendeesEntity.save(eachattendee);
                return {
                    attendee_id: eachattendee.attendee_id,
                    status: 1,
                    message: 'Item was successfully saved/updated',
                };
          }     catch (err) {
                return {
                    attendee_id: eachattendee.attendee_id,
                    status: 0,
                    message: err.message,
                };
          }
        }),
      );
    return updatedData;
  
  }

  //sync down functionality
  public async downloadMeetingLogList(last_sync_time: string, entity_id:string, hub_id:string) {
    try{
        const lastDownloadTime = new Date(last_sync_time).toISOString();

        //Check if service can be accessed by entity id passed
        const entityGroups = [CONSTANTS.SHP_SUPERVISOR];

        const entityArr = await getEntityArray(entityGroups);

        if (entity_id && !entityArr.includes(entity_id.trim())) {
        return [];
        }

        const data = await MeetingAttendeesEntity.createQueryBuilder('table')
        .select()
        .where('table.updated_at >= :lastDownloadTime AND hub_id = :hub_id', { lastDownloadTime, hub_id})
        .getMany();
   
        return data;
    }
    catch (err) {
        throw err;
    }
  }


}

export default MeetingAttendeesService;
