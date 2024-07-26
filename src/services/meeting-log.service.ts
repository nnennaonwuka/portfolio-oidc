import { EntityRepository, Repository, getConnection } from "typeorm";
import { MeetingLogDto } from "@dtos/meeting-log.dto";
import { MeetingLogEntity } from "@entities/meeting-log.entity";
import { HttpException } from "@exceptions/HttpException";
import { MeetingLog } from "@interfaces/meeting-log.interface";
import { getTgs } from "@/helpers/get_master_assignment";
import { getArrayString } from "@/helpers/array_sterilizer";

@EntityRepository()
class MeetingLogService extends Repository<MeetingLogEntity> {
  //sync up functionality
  public async updateMeetingLogList(
    MeetingLogData: MeetingLogDto[]
  ): Promise<MeetingLog[]> {
    if (MeetingLogData.length === 0)
      throw new HttpException(400, "MeetingLog data is empty");

    const updatedData = [];

    for (const item of MeetingLogData) {
      if (item.meeting_log_id) {
        const findExistingMeetingLog: MeetingLog =
          await MeetingLogEntity.findOne({
            where: { meeting_log_id: item.meeting_log_id },
          });

        if (findExistingMeetingLog) {
          await MeetingLogEntity.update(findExistingMeetingLog.meeting_log_id, {
            ...item,
          });
          updatedData.push({ meeting_log_id: item.meeting_log_id, status: 1 });
        } else {
          const createMeetingLog: MeetingLog = await MeetingLogEntity.create({
            ...item,
          }).save();
          updatedData.push({
            meeting_log_id: createMeetingLog.meeting_log_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadMeetingLogList(
    last_sync_time: string,
    staff_id: string,
    operator_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    if (operator_id) {
      const meetingLogAttendancePerTG = await getConnection().query(`
      SELECT DISTINCT meeting_log_id FROM meeting_log_attendance_entity WHERE operator_id = '${operator_id}'
      `);
      const meetingLogIDs =
        meetingLogAttendancePerTG.length > 0
          ? meetingLogAttendancePerTG.map((item) => item.meeting_log_id)
          : [];

      const uniqueMeetingLogIDs = getArrayString(meetingLogIDs);

      const meetingLogList = await getConnection().query(`
    SELECT * FROM meeting_log_entity WHERE meeting_log_id IN (${uniqueMeetingLogIDs}) AND updated_at >= TIMESTAMP'${lastDownloadTime}'
    `);

      return meetingLogList;
    }
    const assignments = await getTgs(staff_id);
    const sterilizedTgs = getArrayString(assignments);
    const meetingLogAttendancePerTG = await getConnection().query(`
    SELECT DISTINCT meeting_log_id FROM meeting_log_attendance_entity WHERE ik_number IN (${sterilizedTgs})
    `);

    const meetingLogIDs =
      meetingLogAttendancePerTG.length > 0
        ? meetingLogAttendancePerTG.map((item) => item.meeting_log_id)
        : [];

    const uniqueMeetingLogIDs = getArrayString(meetingLogIDs);

    const meetingLogList = await getConnection().query(`
    SELECT * FROM meeting_log_entity WHERE meeting_log_id IN (${uniqueMeetingLogIDs}) AND updated_at >= TIMESTAMP'${lastDownloadTime}'
    `);

    return meetingLogList;
  }
}

export default MeetingLogService;
