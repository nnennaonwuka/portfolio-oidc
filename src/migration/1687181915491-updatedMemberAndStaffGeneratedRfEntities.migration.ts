import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedMemberAndStaffGeneratedRfEntities1687181915491
  implements MigrationInterface
{
  name = "updatedMemberAndStaffGeneratedRfEntities1687181915491";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" ADD "image_name" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" ADD "system_risk_level" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" ADD "user_risk_level" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" ADD "entity_id" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" DROP COLUMN "entity_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" DROP COLUMN "user_risk_level"`
    );
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" DROP COLUMN "system_risk_level"`
    );
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" DROP COLUMN "image_name"`
    );
  }
}
