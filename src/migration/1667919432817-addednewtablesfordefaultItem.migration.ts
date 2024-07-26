import { MigrationInterface, QueryRunner } from "typeorm";

export class addednewtablesfordefaultItem1667919432817
  implements MigrationInterface
{
  name = "addednewtablesfordefaultItem1667919432817";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "defaulting_tg_entity" ("tg_id" character varying NOT NULL, "opening_balance" character varying, "program" character varying, "staff_id" character varying, "hub_id" character varying, "defaulting_year" character varying, "risk_level" character varying, "nature" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5dd0868df3f031c95eb53d17aa6" PRIMARY KEY ("tg_id"))`
    );

    await queryRunner.query(
      `CREATE TABLE "payment_tracker_entity" ("tracker_id" character varying NOT NULL, "tg_id" character varying, "comment" character varying, "deactivate_flag" integer, "member_verified_flag" integer, "app_version" character varying, "imei" character varying, "staff_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_623172b5162ebab834eec6c1b55" PRIMARY KEY ("tracker_id"))`
    );

    await queryRunner.query(
      `CREATE TABLE "payment_transactions_entity" ("tracker_id" character varying NOT NULL, "receipt_id" character varying NOT NULL, "tg_id" character varying, "amount" character varying, "receiver_name" character varying, "member_verified_flag" integer, "comment" character varying, "app_version" character varying, "imei" character varying, "staff_id" character varying, "date" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_746158fa6d142f3f56285f2efab" PRIMARY KEY ("tracker_id", "receipt_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payment_transactions_entity"`);
    await queryRunner.query(`DROP TABLE "payment_tracker_entity"`);
    await queryRunner.query(`DROP TABLE "defaulting_tg_entity"`);
  }
}
