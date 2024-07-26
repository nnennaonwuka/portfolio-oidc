import { MigrationInterface, QueryRunner } from "typeorm";

export class addedOperatorIdToMultipleTables1686631244942
  implements MigrationInterface
{
  name = "addedOperatorIdToMultipleTables1686631244942";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ADD "operator_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_attendance_entity" ADD "operator_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ADD "operator_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ADD "operator_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ADD "operator_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ADD "operator_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ADD "operator_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "meeting_log_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "unique_member_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "ik_number" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "type" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "sub_activity_log_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "imei" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "app_version" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "date_logged" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_attendance_entity" ALTER COLUMN "ik_number" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_attendance_entity" ALTER COLUMN "date_joined" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_attendance_entity" ALTER COLUMN "verification_flag" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_attendance_entity" ALTER COLUMN "staff_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_attendance_entity" ALTER COLUMN "app_version" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "portfolio_media_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "unique_member_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "ik_number" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "topic" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "activity_log_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "language" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "staff_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "imei" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "app_version" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "date_logged" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ALTER COLUMN "meeting_config_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ALTER COLUMN "start_date" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ALTER COLUMN "no_of_attendees" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ALTER COLUMN "staff_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ALTER COLUMN "imei" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ALTER COLUMN "app_version" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "comment" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "activity_log_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "unique_member_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "ik_number" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "date_logged" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "staff_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "app_version" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "imei" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "survey_config_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "unique_member_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "ik_number" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "questions_answered" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "activity_log_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "imei" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "date_logged" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "staff_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "app_version" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "faq_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "unique_member_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "ik_number" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "activity_log_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "date_logged" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "staff_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "app_version" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "imei" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "imei" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "app_version" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "staff_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "date_logged" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "activity_log_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "ik_number" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "unique_member_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" ALTER COLUMN "faq_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "app_version" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "staff_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "date_logged" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "imei" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "activity_log_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "questions_answered" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "ik_number" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "unique_member_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" ALTER COLUMN "survey_config_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "imei" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "app_version" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "staff_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "date_logged" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "ik_number" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "unique_member_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "activity_log_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" ALTER COLUMN "comment" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ALTER COLUMN "app_version" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ALTER COLUMN "imei" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ALTER COLUMN "staff_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ALTER COLUMN "no_of_attendees" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ALTER COLUMN "start_date" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" ALTER COLUMN "meeting_config_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "date_logged" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "app_version" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "imei" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "staff_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "language" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "activity_log_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "topic" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "ik_number" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "unique_member_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" ALTER COLUMN "portfolio_media_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_attendance_entity" ALTER COLUMN "app_version" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_attendance_entity" ALTER COLUMN "staff_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_attendance_entity" ALTER COLUMN "verification_flag" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_attendance_entity" ALTER COLUMN "date_joined" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_attendance_entity" ALTER COLUMN "ik_number" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "date_logged" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "app_version" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "imei" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "sub_activity_log_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "type" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "ik_number" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "unique_member_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" ALTER COLUMN "meeting_log_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "faq_log_entity" DROP COLUMN "operator_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_log_entity" DROP COLUMN "operator_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "social_call_log_entity" DROP COLUMN "operator_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_entity" DROP COLUMN "operator_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "knowledge_log_entity" DROP COLUMN "operator_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_log_attendance_entity" DROP COLUMN "operator_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log_entity" DROP COLUMN "operator_id"`
    );
  }
}
