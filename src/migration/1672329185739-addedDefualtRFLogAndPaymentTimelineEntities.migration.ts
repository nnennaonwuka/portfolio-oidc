import { MigrationInterface, QueryRunner } from "typeorm";

export class addedDefualtRFLogAndPaymentTimelineEntities1672329185739
  implements MigrationInterface
{
  name = "addedDefualtRFLogAndPaymentTimelineEntities1672329185739";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "default_rf_log_entity" ("tg_id" character varying NOT NULL, "rf_type" character varying NOT NULL, "date_logged" character varying NOT NULL, "date_solved" character varying, "rf_status" integer, "staff_id" character varying, "imei" character varying, "app_version" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_75ae0d001b764367b8ea9c7a959" PRIMARY KEY ("tg_id", "rf_type", "date_logged"))`
    );
    await queryRunner.query(
      `CREATE TABLE "payment_timeline_entity" ("tg_id" character varying NOT NULL, "date_logged" character varying NOT NULL, "reference_id" character varying, "deliver_flag" integer, "payment_flag" integer, "debt_flag" integer, "plan_flag" integer, "frequency" character varying, "frequency_count" character varying, "minimum_amount" character varying, "completion_date" character varying, "next_date" character varying, "next_amount" character varying, "staff_id" character varying, "imei" character varying, "app_version" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b87f3c2f13283e64c86d1056846" PRIMARY KEY ("tg_id", "date_logged"))`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" ADD "phone_number" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" ADD "cash_deposit_flag" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_tracker_entity" ADD "phone_number" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_tracker_entity" DROP COLUMN "phone_number"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" DROP COLUMN "cash_deposit_flag"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" DROP COLUMN "phone_number"`
    );
    await queryRunner.query(`DROP TABLE "payment_timeline_entity"`);
    await queryRunner.query(`DROP TABLE "default_rf_log_entity"`);
  }
}
