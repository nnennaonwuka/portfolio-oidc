import { EntityRepository, Repository, getConnection } from "typeorm";
import { StaffGeneratedRfDto } from "@dtos/staff-generated-rf.dto";
import { StaffGeneratedRfEntity } from "@entities/staff-generated-rf.entity";
import { HttpException } from "@exceptions/HttpException";
import { StaffGeneratedRf } from "@interfaces/staff-generated-rf.interface";
import {
  getRFRestriction,
  getStaff,
  getStaffAssignment,
} from "@/helpers/get_master_assignment";
import { getArrayString } from "@/helpers/array_sterilizer";
import CONSTANTS from "@/helpers/contants";
import { HistoricalStaffGeneratedRfEntity } from "@entities/historical-staff-generated-rf.entity";

@EntityRepository()
class StaffGeneratedRfService extends Repository<StaffGeneratedRfEntity> {
  //sync up functionality
  public async updateStaffGeneratedRfList(
    StaffGeneratedRfData: StaffGeneratedRfDto[]
  ): Promise<Array<{}>> {
    if (StaffGeneratedRfData.length === 0) {
      throw new HttpException(400, "StaffGeneratedRf data is empty");
    }
  
    const connection = getConnection();
    const updatedData: Array<{}> = [];
    const conflictingRecords: Partial<HistoricalStaffGeneratedRfEntity>[] = [];
  
    for (const item of StaffGeneratedRfData) {
      try {
        // Check for conflicts by looking for an existing entry in the original table
        const existingRecord = await connection.getRepository(StaffGeneratedRfEntity)
          .createQueryBuilder('rf')
          .where('rf.rf_id = :rf_id', { rf_id: item.rf_id })
          .andWhere('(rf.staff_id_created != :staff_id_created OR rf.staff_id_solved != :staff_id_solved OR rf.staff_id_verified != :staff_id_verified)', {
            staff_id_created: item.staff_id_created,
            staff_id_solved: item.staff_id_solved,
            staff_id_verified: item.staff_id_verified,
          })
          .getOne();
  
        if (existingRecord) {
          // Create a historical record from the existing entry
          const historicalRecord: Partial<HistoricalStaffGeneratedRfEntity> = {
            rf_type: existingRecord.rf_type,
            rf_status: existingRecord.rf_status,
            staff_id_created: existingRecord.staff_id_created,
            staff_id_solved: existingRecord.staff_id_solved,
            staff_id_verified: existingRecord.staff_id_verified,
            hub_id: existingRecord.hub_id,
            red_flagged_staff_id: existingRecord.red_flagged_staff_id,
            reopen_flag: existingRecord.reopen_flag,
            date_logged: existingRecord.date_logged,
            date_solved: existingRecord.date_solved,
            date_verified: existingRecord.date_verified,
            comment_created: existingRecord.comment_created,
            comment_solved: existingRecord.comment_solved,
            comment_verified: existingRecord.comment_verified,
            entity_id: existingRecord.entity_id,
            image_name: existingRecord.image_name,
            system_risk_level: existingRecord.system_risk_level,
            user_risk_level: existingRecord.user_risk_level,
            presence_flag: existingRecord.presence_flag,
            app_version: existingRecord.app_version,
            imei: existingRecord.imei,
            log_entity_id: existingRecord.log_entity_id,
            solve_entity_id: existingRecord.solve_entity_id,
            category: existingRecord.category,
            solve_method: existingRecord.solve_method,
            red_flag_id: existingRecord.red_flag_id,
            created_at: existingRecord.created_at,
            updated_at: existingRecord.updated_at,
          };
          conflictingRecords.push(historicalRecord);
        }
  
        // Save the new record
        await connection.getRepository(StaffGeneratedRfEntity).save(item);
  
        updatedData.push({
          rf_id: item.rf_id,
          status: 1,
          message: 'Item was successfully uploaded/updated',
        });
      } catch (err) {
        updatedData.push({
          rf_id: item.rf_id,
          status: 0,
          message: err.message,
        });
      }
    }
  
    // Perform bulk insert into the historical table for conflicting records
    if (conflictingRecords.length > 0) {
      await connection.getRepository(HistoricalStaffGeneratedRfEntity).insert(conflictingRecords);
    }
  
    return updatedData;
  }
  //sync down functionality
  public async downloadStaffGeneratedRfList(
    last_sync_time: string,
    staff_id: string,
    hub_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();
    const { role } = (await getStaff(staff_id)) ?? {};

    if (role && CONSTANTS.LML_ROLES.includes(role)) {
      return await getConnection().query(`
        SELECT * FROM staff_generated_rf_entity
        WHERE hub_id = '${hub_id}' AND updated_at >= '${lastDownloadTime}';
      `);
    } else {
      const staffAssignment = await getStaffAssignment(staff_id);
      const staffIds = getArrayString(staffAssignment);
      const sensitiveRf = await getRFRestriction("sensitive_rfs");

      const rfs = getArrayString(sensitiveRf.value.split(","));

      return await getConnection().query(`
        SELECT * FROM staff_generated_rf_entity
        WHERE (red_flagged_staff_id IN (${staffIds}) OR staff_id_created IN (${staffIds}))
        AND updated_at >= '${lastDownloadTime}'
        UNION
        SELECT * FROM staff_generated_rf_entity
        WHERE (staff_id_created = '${staff_id}' OR (red_flagged_staff_id = '${staff_id}' AND rf_type NOT IN (${rfs})))
        AND updated_at >= '${lastDownloadTime}';
      `);
    }
  }
}

export default StaffGeneratedRfService;
