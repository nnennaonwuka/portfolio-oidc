import { EntityRepository, Repository} from "typeorm";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";
import { MeetingRoomsEntity } from "@/entities/meeting_rooms.entity";
import HrPrepaidCardsEntity from "@/entities/hr_prepaid_cards.entity";

@EntityRepository()
class MeetingRoomsService extends Repository<MeetingRoomsEntity> {
  //sync up functionality
  public async updateMeetingRooms(MeetingRoomsData: MeetingRoomsEntity[]): Promise<Array<{}>> {

    const updatedData = await Promise.all(
        MeetingRoomsData.map(async eachMeetingRoom => {
          try {
            await MeetingRoomsEntity.save(eachMeetingRoom);
            return {
            room_id: eachMeetingRoom.room_id,
            status: 1,
            message: 'Item was successfully saved/updated',
            };
          } catch (err) {
            return {
            room_id: eachMeetingRoom.room_id,
            status: 0,
            message: err.message,
            };
          }
        }),
      );
    return updatedData;
  
  }

  //sync down functionality
  public async downloadMeetingRooms(last_sync_time: string, staff_id: string, entity_id:string, hub_id: string) {
    try{
        const lastDownloadTime = new Date(last_sync_time).toISOString();

        //Check if service can be accessed by entity id passed
        const entityGroups = [CONSTANTS.SHP_SUPERVISOR];

        const entityArr = await getEntityArray(entityGroups);

        if (entity_id && !entityArr.includes(entity_id.trim())) {
        return [];
        }

        if(hub_id){
          const data = await MeetingRoomsEntity.createQueryBuilder('table')
          .select()
          .where('table.updated_at >= :lastDownloadTime AND table.hub_id = :hub_id', { lastDownloadTime, hub_id })
          .getMany();
   
          return data;
        }

        const data = await MeetingRoomsEntity.createQueryBuilder('table')
        .select()
        .where('table.updated_at >= :lastDownloadTime AND table.staff_id = :staff_id', { lastDownloadTime, staff_id })
        .getMany();
   
        return data;
    }
    catch (err) {
        throw err;
    }
  }


}

export default MeetingRoomsService;
