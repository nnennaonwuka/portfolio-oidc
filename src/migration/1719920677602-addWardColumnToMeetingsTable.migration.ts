import {MigrationInterface, QueryRunner} from "typeorm";

export class addWardColumnToMeetingsTable1719920677602 implements MigrationInterface {
    name = 'addWardColumnToMeetingsTable1719920677602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "ward" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "ward"`);
    }

}
