import { MigrationInterface, QueryRunner } from "typeorm";

export class addPaymentCollectionTables1681340951728
  implements MigrationInterface
{
  name = "addPaymentCollectionTables1681340951728";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "confirmed_deposits_entity" ("deposit_id" character varying NOT NULL, "operator_id" character varying, "payment_claim_id" character varying, "bank_name" character varying, "date_of_confirmation" character varying, "ik_number" character varying, "amount_deposited" character varying, "sync_flag" character varying, "imei" character varying, "app_version" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0eed62cb1000cdc4b82175d0363" PRIMARY KEY ("deposit_id"))`
    );

    await queryRunner.query(
      `CREATE TABLE "deposits_entity" ("deposit_id" character varying NOT NULL, "operator_id" character varying, "date_of_deposit" character varying, "bank_name" character varying, "amount_deposited" character varying, "account_name" character varying, "description" character varying, "imei" character varying, "app_version" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_761f04a031ac32e1771f69309d3" PRIMARY KEY ("deposit_id"))`
    );

    await queryRunner.query(
      `CREATE TABLE "payment_claims_entity" ("payment_claim_id" character varying NOT NULL, "ik_number" character varying, "unique_member_id" character varying, "account_name" character varying, "amount_deposited" character varying, "date_of_deposit" character varying, "time_of_deposit" character varying, "agent_name" character varying, "pos_bank_community" character varying, "comment" character varying, "staff_id" character varying, "imei" character varying, "app_version" character varying, "sync_flag" integer, "delete_flag" integer, "operator_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_90d97cebd96f30f96a4c943c5d9" PRIMARY KEY ("payment_claim_id"))`
    );

    await queryRunner.query(
      `CREATE TABLE "operator_wallet_details_entity" ("staff_id" character varying NOT NULL, "account_name" character varying, "account_number" character varying, "bank_name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b4954ade72a59704d104f69669c" PRIMARY KEY ("staff_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "operator_wallet_details_entity"`);
    await queryRunner.query(`DROP TABLE "payment_claims_entity"`);
    await queryRunner.query(`DROP TABLE "deposits_entity"`);
    await queryRunner.query(`DROP TABLE "confirmed_deposits_entity"`);
  }
}
