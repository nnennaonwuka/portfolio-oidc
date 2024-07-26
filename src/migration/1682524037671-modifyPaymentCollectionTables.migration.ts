import { MigrationInterface, QueryRunner } from "typeorm";

export class modifyPaymentCollectionTables1682524037671
  implements MigrationInterface
{
  name = "modifyPaymentCollectionTables1682524037671";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "receipt_details_entity" ("receipt_id" character varying NOT NULL, "depositors_name" character varying, "ik_number" character varying, "date" TIMESTAMP, "amount_paid" character varying, "operator_id" character varying, "bank_name" character varying, "status" integer DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af26e859a3a6b61d4d4321fbeb0" PRIMARY KEY ("receipt_id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "confirmed_deposits_entity" ADD "hub_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" RENAME COLUMN "account_name" TO "account_number"`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" ADD "receipt_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" ADD "depositor" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" ADD "time_of_deposit" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" ADD "status" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" ADD "hub_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" ADD "rejection_comment" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" ADD "rejection_date" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" ADD "status" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" ADD "depositor_name" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" ADD "hub_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" ADD "delete_date" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" ADD "delete_comment" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" DROP COLUMN "delete_comment"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" DROP COLUMN "delete_date"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" DROP COLUMN "hub_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" DROP COLUMN "depositor_name"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" DROP COLUMN "status"`
    );
    await queryRunner.query(
      `ALTER TABLE "operator_wallet_details_entity" DROP COLUMN "hub_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" DROP COLUMN "rejection_date"`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" DROP COLUMN "rejection_comment"`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" DROP COLUMN "hub_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" DROP COLUMN "status"`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" DROP COLUMN "time_of_deposit"`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" DROP COLUMN "depositor"`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" DROP COLUMN "receipt_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" DROP COLUMN "account_number"`
    );
    await queryRunner.query(
      `ALTER TABLE "confirmed_deposits_entity" DROP COLUMN "hub_id"`
    );
    await queryRunner.query(`DROP TABLE "receipt_details_entity"`);
  }
}
