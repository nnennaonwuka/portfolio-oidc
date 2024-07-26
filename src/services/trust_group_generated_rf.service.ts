import TrustGroupGeneratedRfEntity from "@/entities/trust_group_generated_rf.entity";
import { getArrayString } from "@/helpers/array_sterilizer";
import CONSTANTS from "@/helpers/contants";
import { getStaff, getTgs } from "@/helpers/get_master_assignment";
import { EntityRepository, Repository, getConnection } from "typeorm";
import HistoricalTrustGroupGeneratedRfEntity from "@/entities/historical_trust_group_generated_rf.entity";

@EntityRepository()
class TrustGroupGeneratedRfService extends Repository<TrustGroupGeneratedRfEntity> {
  //sync up functionality
  public async syncUpTrustGroupGeneratedRf(trustGroupGeneratedRfDto: TrustGroupGeneratedRfEntity[]): Promise<Array<{}>> {
    const connection = getConnection();
    const updatedData: Array<{}> = [];
    const conflictingRecords: Partial<HistoricalTrustGroupGeneratedRfEntity>[] = [];
  
    for (const eachTrustGroupGeneratedRfDto of trustGroupGeneratedRfDto) {
      try {
        // Check for conflicts by looking for an existing entry in the original table
        const existingRecord = await connection.getRepository(TrustGroupGeneratedRfEntity)
          .createQueryBuilder('rf')
          .where('rf.rf_id = :rf_id', { rf_id: eachTrustGroupGeneratedRfDto.rf_id })
          .andWhere('(rf.staff_id_created != :staff_id_created OR rf.staff_id_solved != :staff_id_solved OR rf.staff_id_updated != :staff_id_updated)',
            {
              staff_id_created: eachTrustGroupGeneratedRfDto.staff_id_created,
              staff_id_solved: eachTrustGroupGeneratedRfDto.staff_id_solved,
              staff_id_updated: eachTrustGroupGeneratedRfDto.staff_id_updated
            })
          .getOne();
  
        if (existingRecord) {
          // Create a historical record from the existing entry
          const historicalRecord: Partial<HistoricalTrustGroupGeneratedRfEntity> = {
            rf_type: existingRecord.rf_type,
            rf_status: existingRecord.rf_status,
            staff_id_created: existingRecord.staff_id_created,
            staff_id_solved: existingRecord.staff_id_solved,
            staff_id_updated: existingRecord.staff_id_updated,
            hub_id: existingRecord.hub_id,
            ik_number: existingRecord.ik_number,
            reopen_flag: existingRecord.reopen_flag,
            contact_person: existingRecord.contact_person,
            contact_method: existingRecord.contact_method,
            date_logged: existingRecord.date_logged,
            date_solved: existingRecord.date_solved,
            date_updated: existingRecord.date_updated,
            comment_created: existingRecord.comment_created,
            comment_solved: existingRecord.comment_solved,
            comment_updated: existingRecord.comment_updated,
            app_version: existingRecord.app_version,
            imei: existingRecord.imei,
            system_risk_level: existingRecord.system_risk_level,
            user_risk_level: existingRecord.user_risk_level,
            log_entity_id: existingRecord.log_entity_id,
            solve_entity_id: existingRecord.solve_entity_id,
            category: existingRecord.category,
            solve_method: existingRecord.solve_method,
            red_flag_id: existingRecord.red_flag_id,
            presence_flag: existingRecord.presence_flag,
            create_at: existingRecord.create_at,
            updated_at: existingRecord.updated_at,
          };
          conflictingRecords.push(historicalRecord);
        }
  
        // Save the new record
        await connection.getRepository(TrustGroupGeneratedRfEntity).save(eachTrustGroupGeneratedRfDto);
  
        updatedData.push({
          rf_id: eachTrustGroupGeneratedRfDto.rf_id,
          status: 1,
          message: 'Item was successfully uploaded/updated',
        });
      } catch (err) {
        updatedData.push({
          rf_id: eachTrustGroupGeneratedRfDto.rf_id,
          status: 0,
          message: err.message,
        });
      }
    }
  
    // Perform bulk insert into the historical table for conflicting records
    if (conflictingRecords.length > 0) {
      await connection.getRepository(HistoricalTrustGroupGeneratedRfEntity).insert(conflictingRecords);
    }
  
    return updatedData;
  }
  //sync down functionality
  public async downloadTrustGroupGeneratedRf(
    last_sync_time: string,
    staff_id: string,
    hub_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();
    const { role } = (await getStaff(staff_id)) ?? {};

    if (role && CONSTANTS.LML_ROLES.includes(role)) {
      return await getConnection().query(`
        SELECT * FROM trust_group_generated_rf_entity WHERE hub_id = '${hub_id}' AND updated_at >= TIMESTAMP'${lastDownloadTime}'
      `);
    } else {
      const staffAssignment = await getTgs(staff_id);
      const ikNumbers = getArrayString(staffAssignment);

      return await getConnection().query(`
        SELECT * FROM trust_group_generated_rf_entity WHERE ik_number IN (${ikNumbers}) AND updated_at >= TIMESTAMP'${lastDownloadTime}'
      `);
    }
  }
}

export default TrustGroupGeneratedRfService;
