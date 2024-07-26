import { EntityRepository, Repository, getConnection } from "typeorm";
import { MeetingLogAttendanceDto } from "@dtos/meeting-log-attendance.dto";
import { MeetingLogAttendanceEntity } from "@entities/meeting-log-attendance.entity";
import { HttpException } from "@exceptions/HttpException";
import { MeetingLogAttendance } from "@interfaces/meeting-log-attendance.interface";
import { getTgs } from "@/helpers/get_master_assignment";
import { getArrayString } from "@/helpers/array_sterilizer";

@EntityRepository()
class MeetingLogAttendanceService extends Repository<MeetingLogAttendanceEntity> {
  // sync up functionality
  public async updateMeetingLogAttendanceList(
    MeetingLogAttendanceData: MeetingLogAttendanceDto[]
  ): Promise<MeetingLogAttendance[]> {
    if (MeetingLogAttendanceData.length === 0)
      throw new HttpException(400, "MeetingLogAttendance data is empty");

    const updatedData = [];

    for (const item of MeetingLogAttendanceData) {
      if (item.meeting_log_id && item.unique_member_id) {
        const findExistingMeetingLogAttendance: MeetingLogAttendance =
          await MeetingLogAttendanceEntity.findOne({
            where: {
              meeting_log_id: item.meeting_log_id,
              unique_member_id: item.unique_member_id,
            },
          });

        if (findExistingMeetingLogAttendance) {
          await MeetingLogAttendanceEntity.update(
            {
              meeting_log_id: findExistingMeetingLogAttendance.meeting_log_id,
              unique_member_id:
                findExistingMeetingLogAttendance.unique_member_id,
            },
            { ...item }
          );
          updatedData.push({
            meeting_log_id: item.meeting_log_id,
            unique_member_id: item.unique_member_id,
            status: 1,
          });
        } else {
          const createMeetingLogAttendance: MeetingLogAttendance =
            await MeetingLogAttendanceEntity.create({ ...item }).save();
          updatedData.push({
            meeting_log_id: createMeetingLogAttendance.meeting_log_id,
            unique_member_id: createMeetingLogAttendance.unique_member_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadMeetingLogAttendanceList(
    last_sync_time: string,
    staff_id: string,
    operator_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    if (operator_id) {
      const downloads = await getConnection().query(`
      SELECT * FROM meeting_log_attendance_entity WHERE operator_id = '${operator_id}' AND updated_at >= TIMESTAMP'${lastDownloadTime}'
      `);
      return downloads;
    }

    const assignments = await getTgs(staff_id);
    const sterilizedTgs = getArrayString(assignments);
    const meetingLogAttendancePerTG = await getConnection().query(`
    SELECT * FROM meeting_log_attendance_entity WHERE ik_number IN (${sterilizedTgs}) AND updated_at >= TIMESTAMP'${lastDownloadTime}'
    `);

    return meetingLogAttendancePerTG;
  }
}

export default MeetingLogAttendanceService;
