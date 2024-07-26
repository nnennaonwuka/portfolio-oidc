import { MigrationInterface, QueryRunner } from "typeorm";

export class modifyPaymentClaimsTable1681824221113
  implements MigrationInterface
{
  name = "modifyPaymentClaimsTable1681824221113";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" DROP COLUMN "operator_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" ADD "operator_id" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" DROP COLUMN "operator_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" ADD "operator_id" integer`
    );
  }
}
