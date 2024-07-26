import { MigrationInterface, QueryRunner } from "typeorm";

export class surveyAnswerPK1694537143524 implements MigrationInterface {
  name = "surveyAnswerPK1694537143524";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" DROP CONSTRAINT "PK_76dd1e19623cc29856f33dc6bd7"`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ADD CONSTRAINT "PK_35d38b6ef48fc78d3147c73e3f6" PRIMARY KEY ("unique_member_id", "survey_question_id", "date_logged", "staff_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "date_logged" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "staff_id" SET NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "staff_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ALTER COLUMN "date_logged" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" DROP CONSTRAINT "PK_35d38b6ef48fc78d3147c73e3f6"`
    );
    await queryRunner.query(
      `ALTER TABLE "survey_answer_entity" ADD CONSTRAINT "PK_76dd1e19623cc29856f33dc6bd7" PRIMARY KEY ("unique_member_id", "survey_question_id")`
    );
  }
}
