import { MigrationInterface, QueryRunner } from "typeorm";

export class changeColumnData1683667414535 implements MigrationInterface {
  name = "changeColumnData1683667414535";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" RENAME COLUMN "operator_id" TO "reference_deposit_id"`
    );

    await queryRunner.query(
      `ALTER TABLE "reference_deposits_entity" DROP COLUMN "deposit_id"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reference_deposits_entity" ADD "deposit_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "deposits_entity" RENAME COLUMN "reference_deposit_id" TO "operator_id"`
    );
  }
}
