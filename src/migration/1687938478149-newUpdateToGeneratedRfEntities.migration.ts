import { MigrationInterface, QueryRunner } from "typeorm";

export class newUpdateToGeneratedRfEntities1687938478149
  implements MigrationInterface
{
  name = "newUpdateToGeneratedRfEntities1687938478149";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" ADD "log_entity_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" ADD "solve_entity_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" ADD "category" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" ADD "log_entity_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" ADD "solve_entity_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" ADD "category" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" ADD "system_risk_level" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" ADD "user_risk_level" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" ADD "log_entity_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" ADD "solve_entity_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" ADD "category" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" DROP COLUMN "category"`
    );
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" DROP COLUMN "solve_entity_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" DROP COLUMN "log_entity_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" DROP COLUMN "user_risk_level"`
    );
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" DROP COLUMN "system_risk_level"`
    );
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" DROP COLUMN "category"`
    );
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" DROP COLUMN "solve_entity_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" DROP COLUMN "log_entity_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" DROP COLUMN "category"`
    );
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" DROP COLUMN "solve_entity_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" DROP COLUMN "log_entity_id"`
    );
  }
}
