import { MigrationInterface, QueryRunner } from "typeorm";

export class removeSyncFlags1684849938522 implements MigrationInterface {
  name = "removeSyncFlags1684849938522";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "confirmed_deposits_entity" DROP COLUMN "sync_flag"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" DROP COLUMN "sync_flag"`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" ALTER COLUMN "status" SET DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" ALTER COLUMN "status" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" ADD "sync_flag" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "confirmed_deposits_entity" ADD "sync_flag" character varying`
    );
  }
}
