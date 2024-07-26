import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyAccountNumberColumn1720810055994 implements MigrationInterface {
    name = 'modifyAccountNumberColumn1720810055994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hr_prepaid_cards_entity" ALTER COLUMN "account_no" TYPE character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hr_prepaid_cards_entity" ALTER COLUMN "account_no" TYPE integer`);
    }

}
