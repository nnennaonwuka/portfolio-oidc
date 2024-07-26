import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedTransferAndSelfDepositDetailsEntities1675269559825
  implements MigrationInterface
{
  name = "updatedTransferAndSelfDepositDetailsEntities1675269559825";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "self_deposit_details_entity" ADD "pos_receipt_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "transfer_details_entity" ADD "receipt_id" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transfer_details_entity" DROP COLUMN "receipt_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "self_deposit_details_entity" DROP COLUMN "pos_receipt_id"`
    );
  }
}
