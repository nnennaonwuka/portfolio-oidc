import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedDefaultRfLogEntity1687513677910
  implements MigrationInterface
{
  name = "updatedDefaultRfLogEntity1687513677910";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "default_rf_log_entity" ADD "contact_method" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "default_rf_log_entity" ADD "contact_person" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "default_rf_log_entity" ADD "staff_id_solved" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "default_rf_log_entity" DROP COLUMN "staff_id_solved"`
    );
    await queryRunner.query(
      `ALTER TABLE "default_rf_log_entity" DROP COLUMN "contact_person"`
    );
    await queryRunner.query(
      `ALTER TABLE "default_rf_log_entity" DROP COLUMN "contact_method"`
    );
  }
}
