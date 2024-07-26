import { MigrationInterface, QueryRunner } from "typeorm";

export class changeColumn1683802423033 implements MigrationInterface {
  name = "changeColumn1683802423033";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" ALTER COLUMN "status" SET DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_claims_entity" ALTER COLUMN "status" DROP DEFAULT`
    );
  }
}
