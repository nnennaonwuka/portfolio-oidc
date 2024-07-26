import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRedFlagIdToEntities1688560119958
  implements MigrationInterface
{
  name = "AddedRedFlagIdToEntities1688560119958";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" ADD "red_flag_id" character varying`
    );

    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" ADD "red_flag_id" character varying`
    );

    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" ADD "red_flag_id" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" DROP COLUMN "red_flag_id"`
    );

    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" DROP COLUMN "red_flag_id"`
    );

    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" DROP COLUMN "red_flag_id"`
    );
  }
}
