import { MigrationInterface, QueryRunner } from "typeorm";

export class createVisitationInformationAndQuestionsEntities1675916718428
  implements MigrationInterface
{
  name = "createVisitationInformationAndQuestionsEntities1675916718428";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "visitation_information_entity" ("visitation_id" character varying NOT NULL, "tg_id" character varying, "date_logged" character varying, "comment" character varying, "presence_flag" integer, "member_verified_flag" integer, "app_version" character varying, "imei" character varying, "staff_id" character varying, "phone_number" character varying, CONSTRAINT "PK_da1dc957fa97bb8ff11165c5ee6" PRIMARY KEY ("visitation_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "visitation_questions_entity" ("tg_id" character varying NOT NULL, "visitation_id" character varying NOT NULL, "date_logged" character varying, "agreement_flag" integer, "no_agreement_reason" character varying, "fo_name" character varying, "statement_flag" integer, "deliver_flag" integer, "compliance_flag" integer, "plan_flag" integer, "frequency" character varying, "frequency_count" character varying, "minimum_amount" character varying, "completion_date" character varying, "next_date" character varying, "next_amount" character varying, "staff_id" character varying, "imei" character varying, "app_version" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24eb44fffc4f8a8c13cef0a9cbd" PRIMARY KEY ("tg_id", "visitation_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "visitation_questions_entity"`);
    await queryRunner.query(`DROP TABLE "visitation_information_entity"`);
  }
}
