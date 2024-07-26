import { MigrationInterface, QueryRunner } from "typeorm";

export class addedReceiptUrlToSelfDepositDetailsEntities1676536549722
  implements MigrationInterface
{
  name = "addedReceiptUrlToSelfDepositDetailsEntities1676536549722";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "self_deposit_details_entity" ADD "receipt_url" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "self_deposit_details_entity" DROP COLUMN "receipt_url"`
    );
  }
}
