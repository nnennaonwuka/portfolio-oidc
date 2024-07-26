import {MigrationInterface, QueryRunner} from "typeorm";

export class addPcsColumntoPortfolioManagementTable1703356632147 implements MigrationInterface {
    name = 'addPcsColumntoPortfolioManagementTable1703356632147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_management_assignment_entity" ADD "pcs" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_management_assignment_entity" DROP COLUMN "pcs"`);
    }

}
