import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedSelfDepositAndTransferDetails1680014024394
  implements MigrationInterface
{
  name = "updatedSelfDepositAndTransferDetails1680014024394";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "self_deposit_details_entity" ADD "comment" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "transfer_details_entity" ADD "comment" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transfer_details_entity" DROP COLUMN "comment"`
    );
    await queryRunner.query(
      `ALTER TABLE "self_deposit_details_entity" DROP COLUMN "comment"`
    );
  }
}
