import {MigrationInterface, QueryRunner} from "typeorm";

export class createPortfolioManagementConstantsEntity1707920370753 implements MigrationInterface {
    name = 'createPortfolioManagementConstantsEntity1707920370753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
