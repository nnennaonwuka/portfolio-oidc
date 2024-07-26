import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBankCardAssignmentEntityAddReasonsColumn1720427337441 implements MigrationInterface {
    name = 'updateBankCardAssignmentEntityAddReasonsColumn1720427337441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD "replacement_reason" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP COLUMN "replacement_reason"`);
    }

}
