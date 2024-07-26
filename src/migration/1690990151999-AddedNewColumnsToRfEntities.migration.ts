import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNewColumnsToRfEntities1690990151999
  implements MigrationInterface
{
  name = "AddedNewColumnsToRfEntities1690990151999";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" ADD "presence_flag" character varying`
    );

    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" ADD "system_risk_level" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" ADD "user_risk_level" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" ADD "presence_flag" character varying`
    );

    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" ADD "presence_flag" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" DROP COLUMN "presence_flag"`
    );

    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" DROP COLUMN "presence_flag"`
    );
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" DROP COLUMN "user_risk_level"`
    );
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" DROP COLUMN "system_risk_level"`
    );

    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" DROP COLUMN "presence_flag"`
    );
  }
}
