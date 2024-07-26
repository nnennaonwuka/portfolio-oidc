import { MigrationInterface, QueryRunner } from "typeorm";

export class alterReceiptDetailTable1683201191574
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "receipt_details_entity" ADD COLUMN "phone_number" character varying
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "receipt_details_entity" DROP COLUMN "phone_number"`
    );
  }
}
