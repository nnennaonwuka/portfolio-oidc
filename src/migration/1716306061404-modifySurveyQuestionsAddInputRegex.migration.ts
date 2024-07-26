import {MigrationInterface, QueryRunner} from "typeorm";

export class modifySurveyQuestionsAddInputRegex1716306061404 implements MigrationInterface {
    name = 'modifySurveyQuestionsAddInputRegex1716306061404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_question_entity" ADD "input_regex" character varying`);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_question_entity" DROP COLUMN "input_regex"`);
            }

}
