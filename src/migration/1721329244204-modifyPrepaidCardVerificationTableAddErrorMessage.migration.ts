import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyPrepaidCardVerificationTableAddErrorMessage1721329244204 implements MigrationInterface {
    name = 'modifyPrepaidCardVerificationTableAddErrorMessage1721329244204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" RENAME COLUMN "leader_present_flag" TO "leader_presence_flag"`);
        await queryRunner.query(`ALTER TABLE "bank_card_verification_entity" ADD "error_message" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_card_verification_entity" DROP COLUMN "error_message"`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" RENAME COLUMN "leader_presence_flag" TO "leader_present_flag"`);
    }

}
