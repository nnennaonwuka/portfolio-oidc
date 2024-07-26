import { MigrationInterface, QueryRunner } from "typeorm";

export class addNewTables1683547230836 implements MigrationInterface {
  name = "addNewTables1683547230836";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reference_deposits_entity" ("reference_deposit_id" character varying NOT NULL, "deposit_id" character varying, "date_of_deposit" character varying, "bank_name" character varying, "amount_deposited" character varying, "description" character varying, "imei" character varying, "app_version" character varying, "account_number" character varying, "receipt_id" character varying, "depositor" character varying, "time_of_deposit" character varying, "status" integer, "hub_id" character varying, "rejection_comment" character varying, "rejection_date" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b6b03c44746784c66fa29f4c7fb" PRIMARY KEY ("reference_deposit_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "reference_deposits_entity"`);
  }
}
