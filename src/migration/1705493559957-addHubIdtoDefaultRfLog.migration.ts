import {MigrationInterface, QueryRunner} from "typeorm";

export class addHubIdtoDefaultRfLog1705493559957 implements MigrationInterface {
    name = 'addHubIdtoDefaultRfLog1705493559957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "default_rf_log_entity" ADD "hub_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "default_rf_log_entity" DROP COLUMN "hub_id"`);
    }

}
