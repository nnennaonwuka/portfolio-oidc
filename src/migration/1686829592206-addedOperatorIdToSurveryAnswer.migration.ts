import { MigrationInterface, QueryRunner } from "typeorm";

export class addedOperatorIdToSurveryAnswer1686829592206
  implements MigrationInterface
{
  name = "addedOperatorIdToSurveryAnswer1686829592206";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ADD "operator_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "survey_log_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "ik_number" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "answer" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "date_logged" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "staff_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "app_version" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "app_version" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "staff_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "date_logged" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "answer" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "ik_number" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "survey_log_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" DROP COLUMN "operator_id"`
    );
  }
}
