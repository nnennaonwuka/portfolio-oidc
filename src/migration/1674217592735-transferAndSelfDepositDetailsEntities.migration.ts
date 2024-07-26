import { MigrationInterface, QueryRunner } from "typeorm";

export class transferAndSelfDepositDetailsEntities1674217592735
  implements MigrationInterface
{
  name = "transferAndSelfDepositDetailsEntities1674217592735";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "self_deposit_details_entity" ("tg_id" character varying NOT NULL, "date_logged" character varying NOT NULL, "depositor_name" character varying, "deposit_date" character varying, "amount" character varying, "latitude" character varying, "longitude" character varying, "bank_name" character varying, "bank_community" character varying, "bank_ward" character varying, "receipt_id" character varying, "staff_id" character varying, "imei" character varying, "app_version" character varying, "bank_lga" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf83c5bbf294bc320e3af84e360" PRIMARY KEY ("tg_id", "date_logged"))`
    );
    await queryRunner.query(
      `CREATE TABLE "transfer_details_entity" ("tg_id" character varying NOT NULL, "date_logged" character varying NOT NULL, "amount" character varying, "sender_name" character varying, "transfer_date" character varying, "narration" character varying, "staff_id" character varying, "imei" character varying, "app_version" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7c3846c7c5e91010e8f0c1ade76" PRIMARY KEY ("tg_id", "date_logged"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transfer_details_entity"`);
    await queryRunner.query(`DROP TABLE "self_deposit_details_entity"`);
  }
}
