import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedStaffGeneratedRfEntity1687182924662
  implements MigrationInterface
{
  name = "updatedStaffGeneratedRfEntity1687182924662";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" ADD "image_name" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" DROP COLUMN "image_name"`
    );
  }
}
