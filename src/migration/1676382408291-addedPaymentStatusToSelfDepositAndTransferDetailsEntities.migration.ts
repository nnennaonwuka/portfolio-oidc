import { MigrationInterface, QueryRunner } from "typeorm";

export class addedPaymentStatusToSelfDepositAndTransferDetailsEntities1676382408291
  implements MigrationInterface
{
  name =
    "addedPaymentStatusToSelfDepositAndTransferDetailsEntities1676382408291";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "self_deposit_details_entity" ADD "payment_status" character varying NOT NULL DEFAULT 'PENDING'`
    );
    await queryRunner.query(
      `ALTER TABLE "transfer_details_entity" ADD "payment_status" character varying NOT NULL DEFAULT 'PENDING'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transfer_details_entity" DROP COLUMN "payment_status"`
    );
    await queryRunner.query(
      `ALTER TABLE "self_deposit_details_entity" DROP COLUMN "payment_status"`
    );
  }
}
