import { EntityRepository, getConnection, Repository } from "typeorm";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";
import BankCardVerification from '../interfaces/bank_card_verification.interface';
import BankCardVerificationEntity from "@/entities/bank_card_verification.entity";
import { VerifyCardsDto } from "@/dtos/verify-card.dto";
import { FlagErrorDto } from "@/dtos/flag_error.dto";

@EntityRepository(BankCardVerificationEntity)
class BankCardVerificationService extends Repository<BankCardVerificationEntity> {
  public async synchronizeDown(
    last_sync_time: string,
    entity_id: string
  ): Promise<BankCardVerification[]> {
    try {
      //Check if service can be accessed by entity id passed
      const entityGroups = [CONSTANTS.SHP_Member_Success];

      const entityArr = await getEntityArray(entityGroups);

      if (entity_id && !entityArr.includes(entity_id.trim())) {
        return [];
      }

      const givenSyncTime = new Date(last_sync_time).toISOString();
      const downloads: BankCardVerification[] =
        await BankCardVerificationEntity.createQueryBuilder("table")
          .select()
          .where("table.updated_at >= :givenSyncTime ", { givenSyncTime})
          .getMany();
      return downloads;
    } catch (err) {
      throw err;
    }
  }

  public async synchronizeUp(
    BankCardVerifications: BankCardVerificationEntity[]
  ): Promise<Array<{}>> {
    const updatedData = await Promise.all(
        BankCardVerifications.map(async (verification) => {
        try {
          await BankCardVerificationEntity.save(verification);
          return {
            verification_id: verification.verification_id,
            status: 1,
            message: "Item was successfully saved/updated",
          };
        } catch (err) {
          return {
            verification_id: verification.verification_id,
            status: 0,
            message: err.message,
          };
        }
      })
    );
    return updatedData;
  }
  public async verifyCard(cardData:VerifyCardsDto){
    try{
      const {ik_number, bank_card_id, unique_entity_id, card_number}= cardData

      const card_no = await getConnection().query(`
      SELECT bg_card_number 
      FROM bank_card_assignment_info
      WHERE unique_entity_id = '${unique_entity_id}' 
      AND bank_card_id = '${bank_card_id}'; `)

      if(card_no.length == 0){
        return [{state:0, message:"Card not found",status:404}];
      }

      const currentDate = new Date()
  const formattedDate = currentDate
		.toISOString()
		.replace("T", " ")
		.substring(0, 19);

      if(card_no[0].bg_card_number != card_number){
        await getConnection().query(`
        INSERT INTO public.bank_card_verification_entity(
          verification_id, bg_card_id, staff_id, ik_number, gotten_ms_card_number, expected_bg_card_number, status, error_id, error_log_date, created_at, updated_at)
          VALUES ('BCV_staff_id_${formattedDate}', '${bank_card_id}', 'staff_id', '${ik_number}', '${card_number}', '${card_no[0].bg_card_number}', '2','1234',now(), now(),now());
        `)
        await getConnection().query(`
        UPDATE bank_card_assignment_info 
        SET portal_card_status = '2' , updated_at = now()
        WHERE unique_entity_id = '${unique_entity_id}' AND bank_card_id = '${bank_card_id}';
        `)
        await getConnection().query(`
        INSERT INTO notifications_entity(
        id, content, type, created_at, updated_at)
        VALUES ('NOT_POP_${unique_entity_id}_${formattedDate}', '{"message":"Notify Process Control to Verify Card","ik_number":"${ik_number}","member_id":"${unique_entity_id}"}', "1", now(), now());
        `)
        return [{state:1, message:"Card Mismatch error flagged",status:200}]
      }
      await getConnection().query(`
        INSERT INTO bank_card_verification_entity(
        verification_id, bg_card_id, staff_id, ik_number, gotten_ms_card_number, expected_bg_card_number, status, created_at, updated_at)
        VALUES ('BCV_staff_id_${formattedDate}', '${bank_card_id}', 'staff_id', '${ik_number}', '${card_number}', '${card_no[0].bg_card_number}', '1', now(),now());
        `)
        await getConnection().query(`
        UPDATE bank_card_assignment_info 
        SET portal_card_status = '1' , updated_at = now()
        WHERE unique_entity_id = '${unique_entity_id}' AND bank_card_id = '${bank_card_id}';
        `)
        return[{state:1, message:"Card status successfully verified",status:200}];
    }
    catch (err) {
      return [0, err.message];
    }
  }
  public async flagError(cardData:FlagErrorDto){
    try{
      const {ik_number, bank_card_id, unique_entity_id, error_message}= cardData

      const card_no = await getConnection().query(`
      SELECT bg_card_number 
      FROM bank_card_assignment_info
      WHERE unique_entity_id = '${unique_entity_id}' 
      AND bank_card_id = '${bank_card_id}'; `)
      if(card_no.length == 0){
        return [{state:0, message:"Card not found",status:404}];
      }
      const currentDate = new Date()
  const formattedDate = currentDate
		.toISOString()
		.replace("T", " ")
		.substring(0, 19);

        await getConnection().query(`
        INSERT INTO public.bank_card_verification_entity(
          verification_id, bg_card_id, staff_id, ik_number, gotten_ms_card_number, expected_bg_card_number, status, error_id, error_log_date, created_at, updated_at)
          VALUES ('BCV_staff_id_${formattedDate}', '${bank_card_id}', 'staff_id', '${ik_number}', null, '${card_no[0].bg_card_number}', '2','1234',now(), now(),now());
        `)
        await getConnection().query(`
        UPDATE bank_card_assignment_info 
        SET portal_card_status = '2' , updated_at = now()
        WHERE unique_entity_id = '${unique_entity_id}' AND bank_card_id = '${bank_card_id}';
        `)
        await getConnection().query(`
        INSERT INTO notifications_entity(
        id, content, type, created_at, updated_at)
          VALUES ('NOT_POP_${unique_entity_id}_${formattedDate}', '{"message":"Notify Process Control to Verify Card","ik_number":"${ik_number}","member_id":"${unique_entity_id}"}', "1", now(), now());
        VALUES ('NOT_POP_${unique_entity_id}_${formattedDate}', '{"message":"Notify Process Control to Verify Card","ik_number":"${ik_number}","member_id":"${unique_entity_id}"}', "1", now(), now());
        `)
        return [{state:1, message:error_message,status:200}]


    }
    catch (err) {
      return [0, err.message];
    }
  }
}
export default BankCardVerificationService;
