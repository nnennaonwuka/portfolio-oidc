import { MigrationInterface, QueryRunner } from "typeorm";

export class modifyPaymentClaimsTable1682638585094
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" ADD "receipt_image" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" DROP COLUMN "receipt_image"`
    );
  }
}
