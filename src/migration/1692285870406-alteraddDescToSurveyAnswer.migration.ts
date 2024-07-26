import { MigrationInterface, QueryRunner } from "typeorm";

export class alteraddDescToSurveyAnswer1692285870406
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ADD COLUMN "desc" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE "survey_answer_entity" DROP COLUMN "desc"`);
  }
}
