import {MigrationInterface, QueryRunner} from "typeorm";

export class modifySurveyLogsandSurveyAnswersEntity1696863186762 implements MigrationInterface {
    name = 'modifySurveyLogsandSurveyAnswersEntity1696863186762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_answer_entity" ADD "unique_entity_id" character varying`);
        await queryRunner.query(`ALTER TABLE "survey_answer_entity" ADD "entity_id" character varying`);
        await queryRunner.query(`ALTER TABLE "survey_answer_entity" ADD "staff_entity_id" character varying`);
        await queryRunner.query(`ALTER TABLE "survey_answer_entity" ADD "section" character varying`);
        await queryRunner.query(`ALTER TABLE "survey_log_entity" ADD "unique_entity_id" character varying`);
        await queryRunner.query(`ALTER TABLE "survey_log_entity" ADD "entity_id" character varying`);
        await queryRunner.query(`ALTER TABLE "survey_log_entity" ADD "staff_entity_id" character varying`);
        await queryRunner.query(`ALTER TABLE "survey_log_entity" ADD "section" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_log_entity" DROP COLUMN "section"`);
        await queryRunner.query(`ALTER TABLE "survey_log_entity" DROP COLUMN "staff_entity_id"`);
        await queryRunner.query(`ALTER TABLE "survey_log_entity" DROP COLUMN "entity_id"`);
        await queryRunner.query(`ALTER TABLE "survey_log_entity" DROP COLUMN "unique_entity_id"`);
        await queryRunner.query(`ALTER TABLE "survey_answer_entity" DROP COLUMN "section"`);
        await queryRunner.query(`ALTER TABLE "survey_answer_entity" DROP COLUMN "staff_entity_id"`);
        await queryRunner.query(`ALTER TABLE "survey_answer_entity" DROP COLUMN "entity_id"`);
        await queryRunner.query(`ALTER TABLE "survey_answer_entity" DROP COLUMN "unique_entity_id"`);
    }

}
