import { EntityRepository, Repository, getConnection } from "typeorm";
import { MemberGeneratedRfDto } from "@dtos/member-generated-rf.dto";
import { MemberGeneratedRfEntity } from "@entities/member-generated-rf.entity";
import { HttpException } from "@exceptions/HttpException";
import { MemberGeneratedRf } from "@interfaces/member-generated-rf.interface";
import {
  convertToISOFormat,
  getArrayString,
  getArrayStringForRf,
} from "@/helpers/array_sterilizer";
import { getStaff, getTgs } from "@/helpers/get_master_assignment";
import CONSTANTS from "@/helpers/contants";
import { HistoricalMemberGeneratedRfEntity } from "@/entities/historical-member-generated-rf.entity";

@EntityRepository()
class MemberGeneratedRfService extends Repository<MemberGeneratedRfEntity> {
  //sync up functionality
  public async updateMemberGeneratedRfList(
    MemberGeneratedRfData: MemberGeneratedRfDto[]
  ): Promise<Array<{}>> {
    if (MemberGeneratedRfData.length === 0) {
      throw new HttpException(400, "MemberGeneratedRf data is empty");
    }
  
    const connection = getConnection();
    const updatedData: Array<{}> = [];
    const conflictingRecords: Partial<HistoricalMemberGeneratedRfEntity>[] = [];
  
    for (const item of MemberGeneratedRfData) {
      try {
        // Check for conflicts by looking for an existing entry in the original table
        const existingRecord = await connection.getRepository(MemberGeneratedRfEntity)
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
          const historicalRecord: Partial<HistoricalMemberGeneratedRfEntity> = {
            rf_type: existingRecord.rf_type,
            rf_status: existingRecord.rf_status,
            staff_id_created: existingRecord.staff_id_created,
            staff_id_solved: existingRecord.staff_id_solved,
            staff_id_verified: existingRecord.staff_id_verified,
            hub_id: existingRecord.hub_id,
            ik_number: existingRecord.ik_number,
            unique_member_id: existingRecord.unique_member_id,
            reopen_flag: existingRecord.reopen_flag,
            date_logged: existingRecord.date_logged,
            date_solved: existingRecord.date_solved,
            date_verified: existingRecord.date_verified,
            comment_created: existingRecord.comment_created,
            comment_solved: existingRecord.comment_solved,
            comment_verified: existingRecord.comment_verified,
            red_flag_id: existingRecord.red_flag_id,
            presence_flag: existingRecord.presence_flag,
            app_version: existingRecord.app_version,
            imei: existingRecord.imei,
            contact_person: existingRecord.contact_person,
            contact_method: existingRecord.contact_method,
            image_name: existingRecord.image_name,
            system_risk_level: existingRecord.system_risk_level,
            user_risk_level: existingRecord.user_risk_level,
            log_entity_id: existingRecord.log_entity_id,
            solve_entity_id: existingRecord.solve_entity_id,
            category: existingRecord.category,
            solve_method: existingRecord.solve_method,
            created_at: existingRecord.created_at,
            updated_at: existingRecord.updated_at,
          };
          conflictingRecords.push(historicalRecord);
        }
  
        // Save the new record
        await connection.getRepository(MemberGeneratedRfEntity).save(item);
  
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
      await connection.getRepository(HistoricalMemberGeneratedRfEntity).insert(conflictingRecords);
    }
  
    return updatedData;
  }

  //sync down functionality
  public async downloadMemberGeneratedRfList(
    last_sync_time: string,
    staff_id: string,
    hub_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();
    const { role } = (await getStaff(staff_id)) ?? {};

    if (role && CONSTANTS.LML_ROLES.includes(role)) {
      return await getConnection().query(`
        SELECT * FROM member_generated_rf_entity WHERE hub_id = '${hub_id}' AND updated_at >= '${lastDownloadTime}'   
      `);
    } else {
      const staffAssignment = await getTgs(staff_id);
      const ikNumbers = getArrayString(staffAssignment);

      return await getConnection().query(`
        SELECT * FROM member_generated_rf_entity WHERE ik_number IN (${ikNumbers}) AND updated_at >= '${lastDownloadTime}'   
      `);
    }
  }

  //sync down functionality for rf payment
  public async downloadMemberGeneratedRfPayment(
    last_sync_time: string,
    staff_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    const memberGeneratedRfPayment =
      await MemberGeneratedRfEntity.createQueryBuilder("table")
        .select()
        .where(
          "table.staff_id_created IN (:staff_id) AND table.updated_at >= :lastDownloadTime",
          { staff_id, lastDownloadTime }
        )
        .getMany();

    return memberGeneratedRfPayment;
  }

  //sync down functionality
  public async downloadMemberGeneratedRfListByHub(
    last_sync_time: string,
    hub_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();
    const rfType = "RF_Failed SO Tests";

    const memberGeneratedRfPerHub =
      await MemberGeneratedRfEntity.createQueryBuilder("table")
        .select()
        .where(
          "table.hub_id = :hub_id AND table.rf_type = :rfType AND table.updated_at >= :lastDownloadTime",
          { hub_id, rfType, lastDownloadTime }
        )
        .getMany();

    return memberGeneratedRfPerHub;
  }

  public async updateMemberGeneratedRfFromFarming(memberData: string[]) {
    const sterilizedData = getArrayStringForRf(memberData);

    await getConnection().query(`
      UPDATE member_generated_rf_entity
      SET rf_status = 1, date_solved = '${convertToISOFormat(new Date().toISOString())}', staff_id_solved = 'System', updated_at = NOW()
      WHERE rf_id IN (${sterilizedData})
    `);
    return;
  }
}

export default MemberGeneratedRfService;
